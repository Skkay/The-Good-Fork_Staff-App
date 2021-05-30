import React from "react";
import { Text, View } from "react-native";

const ChefOrderFoodContentItem = ({ item }) => {
  const quantity = item.quantity;
  const name = item.food.name;

  return (
    <View>
      <Text>{"\t"}- {quantity}x {name}</Text>
    </View>
  );
};

export default ChefOrderFoodContentItem;
