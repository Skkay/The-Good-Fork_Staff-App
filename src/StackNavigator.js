import React from "react";
import { StyleSheet, Pressable } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";

import WaiterHomeScreen from './screens/WaiterHomeScreen';
import Icon from './components/svg/Icon';

const Stack = createStackNavigator();


const styles = StyleSheet.create({
  drawerIcon: {
    marginLeft: 15,
    padding: 5
  }
});

