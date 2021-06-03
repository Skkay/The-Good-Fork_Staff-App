import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView, Text, ActivityIndicator, FlatList, Alert, StyleSheet, View, Pressable } from "react-native";

import { AuthContext } from '../../components/AuthContext';
import ExpiredSession from '../../components/alert/ExpiredSession';
import UnexpectedError from '../../components/alert/UnexpectedError';
import fetchToken from '../../components/fetch/FetchToken';
import fetchTokenValidity from '../../components/fetch/FetchTokenValidity';
import { fetchOrders } from '../../components/fetch/FetchOrders';
import OrderItem from '../../components/orders/OrderItem';
import { updateOrderStatus } from '../../components/fetch/UpdateOrderStatus';

const OrdersScreen = () => {
  const { signOut } = useContext(AuthContext);
  const [token, setToken] = useState(null);
  const [isValidToken, setValidToken] = useState(false);
  const [isLoadingEatInOrders, setLoadingEatInOrders] = useState(true);
  const [isLoadingTakeOutOrders, setLoadingTakeOutOrders] = useState(true);
  const [eatInOrders, setEatInOrders] = useState([]);
  const [takeOutOrders, setTakeOutOrders] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);
  const [takeoutRefreshing, setTakeoutRefreshing] = useState(false);
  const [eatinRefreshing, setEatinRefreshing] = useState(false);

  const handleValidateOrder = (orderId) => {
    updateOrderStatus(token, orderId, 3)
      .then((res) => {
        console.log("Order status successfully updated", res);
        setRefreshKey(oldKey => oldKey + 1)
      })
      .catch((err) => {
        console.log("Error during order status update", err);
        UnexpectedError(err.message);
      });
  }

  const handleCancelOrder = (orderId) => {
    Alert.alert(
      "Confirmer l'annulation ?",
      `Vous êtes sur le point d'annuler une commande, confirmer ?`,
      [
        { text: "Annuler", onPress: () => console.log("Order not canceled") }, 
        { text: "Oui", onPress: () => {
          updateOrderStatus(token, orderId, 1)
            .then((res) => {
              console.log("Order status successfully updated", res);
              setRefreshKey(oldKey => oldKey + 1)
            })
            .catch((err) => {
              console.log("Error during order status update", err);
              UnexpectedError(err.message);
            });
        } }
      ]
    );
  }

  useEffect(() => {
    fetchToken()
      .then((token) => setToken(token))
      .catch((err) => console.log(err));
    if (!token) return;

    fetchTokenValidity(token)
    .then((res) => {
      if (res.valid) {
        setValidToken(true);
      } else {
        ExpiredSession(signOut);
      }
    })
  }, [token, isValidToken]);

  useEffect(() => {
    if (!isValidToken) return;

    fetchOrders(token, 2, false)
      .then((res) => setTakeOutOrders(res))
      .finally(() => { setLoadingTakeOutOrders(false); setTakeoutRefreshing(false); });
  }, [isValidToken, refreshKey, takeoutRefreshing]);

  useEffect(() => {
    if (!isValidToken) return;
    
    fetchOrders(token, 2, true)
      .then((res) => setEatInOrders(res))
      .finally(() => { setLoadingEatInOrders(false); setEatinRefreshing(false); });
  }, [isValidToken, refreshKey, eatinRefreshing]);

  if (isLoadingEatInOrders && isLoadingTakeOutOrders) {
    return (<ActivityIndicator size="large" color="#000000" />);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.buttonGroup}>
        <Pressable style={[styles.buttonGroupButton, styles.button, selectedTab === 0 && styles.buttonSelected]} onPress={() => setSelectedTab(0)}>
          <Text style={[styles.buttonText, selectedTab === 0 && styles.buttonTextSelected]}>Sur place</Text>
        </Pressable>
        <Pressable style={[styles.buttonGroupButton, styles.button, selectedTab === 1 && styles.buttonSelected]} onPress={() => setSelectedTab(1)}>
          <Text style={[styles.buttonText, selectedTab === 1 && styles.buttonTextSelected]}>À emporter</Text>
        </Pressable>
      </View>
      {selectedTab === 0 && (
        <>
        {eatInOrders.length < 1 && <Text style={styles.textNoOrder}>Aucune commande</Text>}
        <FlatList
            data={eatInOrders}
            renderItem={({ item }) => <OrderItem order={item} handleValidateOrder={handleValidateOrder} handleCancelOrder={handleCancelOrder} />}
            keyExtractor={item => item.id.toString()}
            refreshing={eatinRefreshing}
            onRefresh={() => setEatinRefreshing(true)} />
        </>
      )}
      {selectedTab === 1 && (
        <>
        {takeOutOrders.length < 1 && <Text style={styles.textNoOrder}>Aucune commande</Text>}
        <FlatList
          data={takeOutOrders}
          renderItem={({ item }) => <OrderItem order={item} handleValidateOrder={handleValidateOrder} handleCancelOrder={handleCancelOrder} />}
          keyExtractor={item => item.id.toString()}
          refreshing={takeoutRefreshing}
          onRefresh={() => setTakeoutRefreshing(true)} />
        </>
      )}

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    flexDirection: "row",
    backgroundColor: "#E0E0E0",
    margin: 10,
  },
  buttonGroupButton: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    padding: 10,
    margin: 10,
  },
  button: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#000000",
  },
  buttonSelected: {
    backgroundColor: "#000000",
  },
  buttonText: {
    color: "#000000",
    textAlign: "center",
  },
  buttonTextSelected: {
    color: "#FFFFFF",
  },
  textNoOrder: {
    textAlign: "center",
    color: "#6B6B6B",
    fontStyle: "italic",
  }
});

export default OrdersScreen;
