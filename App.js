import React, { useState, useMemo, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginScreen from "./src/screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import Toast from 'react-native-toast-message'

import { AuthContext } from "./src/components/AuthContext";
import CustomDrawer from './src/components/CustomDrawer';
import { WaiterMainStackNavigator, BarmanMainStackNavigator, ChefMainStackNavigator, DefaultStackNavigator } from './src/StackNavigator';

const App = () => {
  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();

  const [isConnected, setConnected] = useState(false);
  const [roles, setRoles] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const signOut = () => {
    try {
      AsyncStorage.removeItem("userToken");
      AsyncStorage.removeItem("userTokenExp");
      AsyncStorage.removeItem("userId");
      AsyncStorage.removeItem("userRoles");
      setConnected(false);
      setRoles([]);
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
        const roles = JSON.parse(await AsyncStorage.getItem("userRoles"));
        console.log("ROLES:", roles);
        if (userTokenExp > Math.floor(Date.now() / 1000)) {
          console.log("Token still valid for", userTokenExp - Math.floor(Date.now() / 1000), "seconds");
          setRoles(roles);
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
          <Drawer.Navigator 
          drawerContent={props => ( <CustomDrawer props={props} signOut={signOut} /> )}
          drawerContentOptions={{ activeTintColor: "#000000" }} >
            {(roles.includes('ROLE_WAITER') || roles.includes('ROLE_ADMIN')) && <Drawer.Screen name="Waiter" component={WaiterMainStackNavigator} options={{ title: "Serveur: Accueil"}} /> }
            {(roles.includes('ROLE_BARMAN') || roles.includes('ROLE_ADMIN')) && <Drawer.Screen name="Barman" component={BarmanMainStackNavigator} options={{ title: "Barman: Accueil"}} /> }
            {(roles.includes('ROLE_CHEF') || roles.includes('ROLE_ADMIN')) && <Drawer.Screen name="Chef" component={ChefMainStackNavigator} options={{ title: "Cuisinier: Accueil"}} /> }

            {(roles.includes('ROLE_USER') && roles.length <= 1) && <Drawer.Screen name="default" component={DefaultStackNavigator} /> }
          </Drawer.Navigator>
        ) : (
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" options={{ title: "Connexion" }}>
              {({ navigation }) => <LoginScreen navigation={navigation} setConnected={setConnected} setRoles={setRoles} />}
            </Stack.Screen>
          </Stack.Navigator>
        )}
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
