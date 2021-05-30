import React from "react";
import { Text, View } from "react-native";

const ChefOrderMenuContentItem = ({ item }) => {
  const quantity = item.quantity;
  const content = item.menu.foods;

  return (
    <View>
      {content.map((food) => (
        <Text key={food.id}>{"\t"}- {quantity}x {food.name}</Text>
      ))}
    </View>
  );
};

export default ChefOrderMenuContentItem;
