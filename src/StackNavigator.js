import React from "react";
import { StyleSheet, Pressable } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";

import WaiterHomeScreen from './screens/WaiterHomeScreen';
import Icon from './components/svg/Icon';
import BarmanHomeScreen from "./screens/BarmanHomeScreen";

const Stack = createStackNavigator();

const WaiterMainStackNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="WaiterHome">
      <Stack.Screen 
        name="WaiterHome" 
        component={WaiterHomeScreen} 
        options={{ 
          title: "Serveur: Accueil",
          headerLeft: () => (
            <Pressable style={styles.drawerIcon} onPress={() => navigation.openDrawer()}>
              <Icon name="Bars" height="28" width="28" />
            </Pressable>
          ) 
        }} 
      />
    </Stack.Navigator>
  );
}

const BarmanMainStackNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="BarmanHome">
      <Stack.Screen 
        name="BarmanHome" 
        component={BarmanHomeScreen} 
        options={{ 
          title: "Barman: Accueil",
          headerLeft: () => (
            <Pressable style={styles.drawerIcon} onPress={() => navigation.openDrawer()}>
              <Icon name="Bars" height="28" width="28" />
            </Pressable>
          ) 
        }} 
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerIcon: {
    marginLeft: 15,
    padding: 5
  }
});

export { WaiterMainStackNavigator, BarmanMainStackNavigator };
