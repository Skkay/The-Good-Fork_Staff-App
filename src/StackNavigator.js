import React from "react";
import { StyleSheet, Pressable } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";

import WaiterHomeScreen from './screens/waiter_screens/WaiterHomeScreen';
import Icon from './components/svg/Icon';
import BarmanHomeScreen from "./screens/barman_screens/BarmanHomeScreen";
import ChefHomeScreen from "./screens/chef_screens/ChefHomeScreen";
import DefaultScreen from "./screens/DefaultScreen";

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

const ChefMainStackNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="ChefHome">
      <Stack.Screen 
        name="ChefHome" 
        component={ChefHomeScreen} 
        options={{ 
          title: "Cuisinier: Accueil",
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

const DefaultStackNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="default">
      <Stack.Screen 
        name="default" 
        component={DefaultScreen} 
        options={{ 
          title: "default",
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

export { WaiterMainStackNavigator, BarmanMainStackNavigator, ChefMainStackNavigator, DefaultStackNavigator };
