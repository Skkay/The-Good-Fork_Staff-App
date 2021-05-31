import React from "react";
import { Text, View } from "react-native";

const BarmanOrderMenuContentItem = ({ item }) => {
  const quantity = item.quantity;
  const content = item.menu.drinks;

  return (
    <View>
      {content.map((drink) => (
        <Text key={drink.id}>{"\t"}- {quantity}x {drink.name}</Text>
      ))}
    </View>
  );
};

export default BarmanOrderMenuContentItem;
