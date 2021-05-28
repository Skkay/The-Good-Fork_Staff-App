import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView, Text, ActivityIndicator, FlatList } from "react-native";

import { AuthContext } from '../../components/AuthContext';
import ExpiredSession from '../../components/alert/ExpiredSession';
import UnexpectedError from '../../components/alert/UnexpectedError';
import fetchToken from '../../components/fetch/FetchToken';
import fetchTokenValidity from '../../components/fetch/FetchTokenValidity';
import fetchOrders from '../../components/fetch/FetchOrders';
import OrderItem from '../../components/orders/OrderItem';
import updateOrderStatus from '../../components/fetch/UpdateOrderStatus';

const OrdersScreen = () => {
  const { signOut } = useContext(AuthContext);
  const [token, setToken] = useState(null);
  const [isValidToken, setValidToken] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const handleValidateOrder = (orderId) => {
    updateOrderStatus(token, orderId, 3)
      .then((res) => {
        console.log("Status order successfully updated", res);
      })
      .catch((err) => {
        console.log("Error during order status updating", err);
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

    fetchOrders(token, 2, false)
      .then((res) => setData(res))
      .finally(() => setLoading(false));
  }, [token, isValidToken]);

  if (isLoading) {
    return (<ActivityIndicator size="large" color="#000000" />);
  }

  return (
    <SafeAreaView>
      <Text>Orders home screen</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => <OrderItem order={item} handleValidateOrder={handleValidateOrder} />}
        keyExtractor={item => item.id.toString()}
      />
    </SafeAreaView>
  );
};

export default OrdersScreen;
