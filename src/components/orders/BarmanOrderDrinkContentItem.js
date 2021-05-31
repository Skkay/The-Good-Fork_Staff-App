import React from "react";
import { Text, View } from "react-native";

const BarmanOrderDrinkContentItem = ({ item }) => {
  const quantity = item.quantity;
  const name = item.drink.name;

  return (
    <View>
      <Text>{"\t"}- {quantity}x {name}</Text>
    </View>
  );
};

export default BarmanOrderDrinkContentItem;
