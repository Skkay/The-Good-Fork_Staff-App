import React from "react";
import { StyleSheet, Pressable } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";

import Icon from './components/svg/Icon';
import WaiterHomeScreen from './screens/waiter_screens/WaiterHomeScreen';
import PendingOrdersScreen from './screens/waiter_screens/PendingOrdersScreen';
import BarmanOrdersScreen from "./screens/barman_screens/BarmanOrdersScreen";
import ChefHomeScreen from "./screens/chef_screens/ChefOrdersScreen";
import DefaultScreen from "./screens/DefaultScreen";
import PlaceOrderScreen from "./screens/waiter_screens/PlaceOrderScreen";
import OrderTypeScreen from "./screens/waiter_screens/OrderTypeScreen";
import ReservationScreen from "./screens/waiter_screens/ReservationScreen";

const Stack = createStackNavigator();

const WaiterMainStackNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="WaiterHome">
      <Stack.Screen 
        name="WaiterHome" 
        component={WaiterHomeScreen} 
        initialParams={{ toastType: "", toastExtra: {} }} 
        options={{ 
          title: "Serveur: Accueil",
          headerLeft: () => (
            <Pressable style={styles.drawerIcon} onPress={() => navigation.openDrawer()}>
              <Icon name="Bars" height="28" width="28" />
            </Pressable>
          ) 
        }} 
      />
      <Stack.Screen name="Orders" component={PendingOrdersScreen} options={{ title: "Commandes en attente"}} />
      <Stack.Screen name="PlaceOrder" component={PlaceOrderScreen} options={{ title: "Passer une commande"}} />
      <Stack.Screen name="OrderType" component={OrderTypeScreen} options={{ title: "Passer une commande"}} />
      <Stack.Screen name="Reservation" component={ReservationScreen} options={{ title: "Réserver une table"}} />
    </Stack.Navigator>
  );
}

const BarmanMainStackNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="BarmanOrders">
      <Stack.Screen 
        name="BarmanOrders" 
        component={BarmanOrdersScreen} 
        options={{ 
          title: "Barman: Commandes",
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
    <Stack.Navigator initialRouteName="ChefOrders">
      <Stack.Screen 
        name="ChefOrders" 
        component={ChefHomeScreen} 
        options={{ 
          title: "Cuisinier: Commandes",
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
