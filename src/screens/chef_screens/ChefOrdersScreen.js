import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView, Text, ActivityIndicator, FlatList } from "react-native";

import { AuthContext } from '../../components/AuthContext';
import ExpiredSession from '../../components/alert/ExpiredSession';
import UnexpectedError from '../../components/alert/UnexpectedError';
import fetchToken from '../../components/fetch/FetchToken';
import fetchTokenValidity from '../../components/fetch/FetchTokenValidity';
import { fetchAllOrders } from '../../components/fetch/FetchOrders';
import ChefOrderItem from '../../components/orders/ChefOrderItem';
import updateOrderStatus from '../../components/fetch/UpdateOrderStatus';

const ChefOrdersScreen = () => {
  const { signOut } = useContext(AuthContext);
  const [token, setToken] = useState(null);
  const [isValidToken, setValidToken] = useState(false);
  const [isLoadingOrders, setLoadingOrders] = useState(true);
  const [orders, setOrders] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleUpdateStatusOrder = (orderId) => {
    updateOrderStatus(token, orderId, 4)
      .then((res) => {
        console.log("Order status successfully updated", res);
        setRefreshKey(oldKey => oldKey + 1)
      })
      .catch((err) => {
        console.log("Error during order status update", err);
        UnexpectedError(err.message);
      });
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
    if (!isValidToken) return;

    fetchAllOrders(token, 3)
      .then((res) => {setOrders(res); console.log(res)})
      .finally(() => setLoadingOrders(false));
  }, [token, isValidToken, refreshKey]);

  if (isLoadingOrders) {
    return (<ActivityIndicator size="large" color="#000000" />);
  }

  return (
    <SafeAreaView>
      {orders.length < 1 ? (<Text style={styles.textNoOrder}>Aucune commande</Text>) : 
      (
        <FlatList
          data={orders}
          renderItem={({ item }) => <ChefOrderItem order={item} handleUpdateStatusOrder={handleUpdateStatusOrder} />}
          keyExtractor={item => item.id.toString()} />
      )}
    </SafeAreaView>
  );
};

export default ChefOrdersScreen;