import React, { useEffect } from "react";
import { SafeAreaView, Text, StyleSheet, Pressable } from "react-native";

import Toast from 'react-native-toast-message'

const WaiterHomeScreen = ({ route, navigation }) => {
  const { toastType, toastExtra } = route.params;

  // Toast notifications
  useEffect(() => {
    if (toastType === "order_success_takeout") {
      Toast.show({
        text1: `Commande n°${toastExtra.id}`,
        text2: 'La commande à emporter a été envoyée avec succès.'
      });
    }
    if (toastType === "order_success_eatin") {
      Toast.show({
        text1: `Commande n°${toastExtra.id}`,
        text2: 'La commande sur place a été envoyée avec succès.'
      });
    }
    if (toastType === "reservation_success") {
      const date = new Date(toastExtra.date);
      Toast.show({
        text1: 'Réservation confirmée',
        text2: `Réservation d'une table de ${toastExtra.table_.place} ${toastExtra.table_.place > 1 ? "places" : "place" }, pour le service de ${toastExtra.service.startTime}h-${toastExtra.service.endTime}h le ${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}.`
      });
    }
  });

  return (
    <SafeAreaView>
      <Text>Waiter home screen</Text>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Orders')}>
        <Text>Orders</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigation.navigate('PlaceOrder')}>
        <Text>Place order</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Reservation')}>
        <Text>Reservation</Text>
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
