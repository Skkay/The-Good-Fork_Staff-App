import React, { useEffect } from "react";
import { SafeAreaView, Text, StyleSheet, Pressable, View } from "react-native";

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
      <Pressable style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]} onPress={() => navigation.navigate('Orders')}>
        <Text style={styles.buttonText}>Commandes en attentes</Text>
      </Pressable>
      <Pressable style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]} onPress={() => navigation.navigate('FinishedOrders')}>
        <Text style={styles.buttonText}>Commandes terminées</Text>
      </Pressable>
      <View style={styles.buttonGroup}>
        <Pressable style={({ pressed }) => [styles.buttonGroupButton, styles.button, pressed && styles.buttonPressed]} onPress={() => navigation.navigate('PlaceOrder')}>
          <Text style={styles.buttonText}>Commander</Text>
        </Pressable>
        <Pressable style={({ pressed }) => [styles.buttonGroupButton, styles.button, pressed && styles.buttonPressed]} onPress={() => navigation.navigate('Reservation')}>
          <Text style={styles.buttonText}>Réserver</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    flexDirection: "row",
  },
  buttonGroupButton: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  button: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    margin: 10,
    borderRadius: 10,

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonPressed: {
    backgroundColor: "#BFBFBF",
  },
  buttonText: {
    color: "#000000",
    textAlign: "center",
    fontSize: 16,
  },
});

export default WaiterHomeScreen;
