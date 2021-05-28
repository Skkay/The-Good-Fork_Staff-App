import React from "react";
import { FlatList } from "react-native";

import Item from "../../../components/place_order/Item";

const FoodTab = ({ data, onItemPress, onItemLongPress }) => {
  const renderItem = ({ item }) => {
    return (
      <Item 
        item={item}
        tab={1}
        onItemPress={onItemPress}
        onItemLongPress={onItemLongPress}
      />
    );
  }

  return (
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
  );
};

export default FoodTab;
