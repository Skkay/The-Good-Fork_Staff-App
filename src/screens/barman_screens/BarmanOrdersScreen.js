import React, { useContext, useEffect, useState, useCallback } from "react";
import { SafeAreaView, Text, ActivityIndicator, FlatList } from "react-native";

import { useFocusEffect } from '@react-navigation/native';

import { AuthContext } from '../../components/AuthContext';
import ExpiredSession from '../../components/alert/ExpiredSession';
import UnexpectedError from '../../components/alert/UnexpectedError';
import fetchToken from '../../components/fetch/FetchToken';
import fetchTokenValidity from '../../components/fetch/FetchTokenValidity';
import { fetchAllOrdersForBarman } from '../../components/fetch/FetchOrders';
import BarmanOrderItem from '../../components/orders/BarmanOrderItem';
import { barmanValidateOrder } from '../../components/fetch/UpdateOrderStatus';

const BarmanOrdersScreen = () => {
  const { signOut } = useContext(AuthContext);
  const [token, setToken] = useState(null);
  const [isValidToken, setValidToken] = useState(false);
  const [isLoadingOrders, setLoadingOrders] = useState(true);
  const [orders, setOrders] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const handleUpdateStatusOrder = (orderId) => {
    barmanValidateOrder(token, orderId)
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
  }, [token]);

  useFocusEffect(
    useCallback(() => {
      setLoadingOrders(true);
      fetchAllOrdersForBarman(token)
        .then((res) => setOrders(res))
        .finally(() => { setLoadingOrders(false); setRefreshing(false); });
    }, [isValidToken, refreshKey, refreshing])
  );

  if (isLoadingOrders) {
    return (<ActivityIndicator size="large" color="#000000" />);
  }

  const renderItem = ({ item }) => {
    if (item.orderedDrink.length !== 0) {
      return (
        <BarmanOrderItem order={item} handleUpdateStatusOrder={handleUpdateStatusOrder} />
      );
    }
    return null;
  }

  return (
    <SafeAreaView>
      {orders.length < 1 ? (<Text style={styles.textNoOrder}>Aucune commande</Text>) : 
      (
        <FlatList
          data={orders}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          refreshing={refreshing}
          onRefresh={() => setRefreshing(true)} />
      )}
    </SafeAreaView>
  );
};

export default BarmanOrdersScreen;
