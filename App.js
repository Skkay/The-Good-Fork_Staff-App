import React, { useState, useMemo, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginScreen from "./src/screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from '@react-navigation/drawer';

import { AuthContext } from "./src/components/AuthContext";

const App = () => {
  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();

  const [isConnected, setConnected] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const signOut = () => {
    try {
      AsyncStorage.removeItem("userToken");
      AsyncStorage.removeItem("userTokenExp");
      AsyncStorage.removeItem("userId");
      AsyncStorage.removeItem("userRoles");
      setConnected(false);
    } catch (e) {
      console.log(e);
    }
  }

  const authContext = useMemo(() => ({
    signOut: () => signOut(),
  }), []);

  // Try to retrieve stored user token
  useEffect(() => {
    setTimeout(async () => {
      try {
        const userTokenExp = await AsyncStorage.getItem("userTokenExp");
        const userToken = await AsyncStorage.getItem("userToken");
        if (userTokenExp > Math.floor(Date.now() / 1000)) {
          console.log("Token still valid for", userTokenExp - Math.floor(Date.now() / 1000), "seconds");
          setConnected(true);
        }
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }, 1000);
  }, []);

  // Loading indicator
  if (isLoading) {
    return (
      <View style={styles.activityIndicator}>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {isConnected ? (
          <Text>Connected</Text>
        ) : (
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" options={{ title: "Connexion" }}>
              {({ navigation }) => <LoginScreen navigation={navigation} setConnected={setConnected} />}
            </Stack.Screen>
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
