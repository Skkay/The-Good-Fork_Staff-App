import React from "react";
import { SafeAreaView, Text, StyleSheet, Pressable } from "react-native";

const WaiterHomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <Text>Waiter home screen</Text>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Orders')}>
        <Text>Orders</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigation.navigate('PlaceOrder')}>
        <Text>Place order</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#53A7D7",
    margin: 10
  },
});

export default WaiterHomeScreen;
