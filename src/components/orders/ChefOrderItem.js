import React from "react";
import { Text, View, StyleSheet, FlatList, Pressable } from "react-native";

import ChefOrderFoodContentItem from './ChefOrderFoodContentItem';
import ChefOrderMenuContentItem from './ChefOrderMenuContentItem';

const ChefOrderItem = ({ order, handleUpdateStatusOrder }) => {
  const date = new Date(order.date_order);
  return (
    <View style={styles.order}>
        <View style={styles.orderHeader}>
          <View>
            <Text>{order.eatIn ? ("Sur place") : ("À emporter")}</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text>
              <Text style={styles.orderHeaderLabel}>N° : </Text>
              <Text>{order.id}</Text>
            </Text>
          </View>
        </View>
        <View style={styles.orderStatus}>
          <Text style={styles.orderStatusText}>{order.status.label}</Text>
        </View>
        <View style={styles.orderContent}>
          {order.orderedMenu.length !== 0 && (
            <View style={styles.orderContentGroup}>
              <Text style={styles.orderContentLabel}>Menus</Text>
              <FlatList
                data={order.orderedMenu}
                renderItem={({ item }) => <ChefOrderMenuContentItem item={item} />}
                listKey={`menus-${order.id}`}
                keyExtractor={item => item.id.toString()}
              />
            </View>
          )}
          {order.orderedFood.length !== 0 && (
            <View style={styles.orderContentGroup}>
              <Text style={styles.orderContentLabel}>Plats</Text>
              <FlatList
                data={order.orderedFood}
                renderItem={({ item }) => <ChefOrderFoodContentItem item={item} />}
                listKey={`foods-${order.id}`}
                keyExtractor={item => item.id.toString()}
              />
            </View>
          )}
        </View>
        <View style={styles.buttonGroup}>
          <Pressable style={({ pressed }) => [styles.buttonGroupButton, styles.buttonValidate, pressed && styles.buttonPressed]} onPress={() => handleUpdateStatusOrder(order.id)}>
            <Text style={styles.buttonText}>Terminer</Text>
          </Pressable>
        </View>
      </View>
  );
};
const stylesVar = {
  borderRadius: 7,
  borderWidth: 1,
  borderColor: "#000000"
};
const styles = StyleSheet.create({
  order: {
    margin: 10,
  },
  orderHeader: {
    backgroundColor: "#E0E0E0",
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopLeftRadius: stylesVar.borderRadius,
    borderTopRightRadius: stylesVar.borderRadius,
    borderWidth: stylesVar.borderWidth,
    borderColor: stylesVar.borderColor,
  },
  orderHeaderLabel: {
    fontSize: 12,
    fontWeight: "bold",
  },
  orderStatus: {
    backgroundColor: "#E0E0E0",
    borderLeftWidth: stylesVar.borderWidth,
    borderRightWidth: stylesVar.borderWidth,
    borderLeftColor: stylesVar.borderColor,
    borderRightColor: stylesVar.borderColor,
  },
  orderStatusText: {
    textTransform: "uppercase",
    textAlign: "center",
  },
  orderContent: {
    backgroundColor: "#ffffff",
    padding: 5,
    borderTopWidth: stylesVar.borderWidth,
    borderLeftWidth: stylesVar.borderWidth,
    borderRightWidth: stylesVar.borderWidth,
    borderTopColor: stylesVar.borderColor,
    borderLeftColor: stylesVar.borderColor,
    borderRightColor: stylesVar.borderColor,    
  },
  orderContentGroup: {
    marginVertical: 5,
  },
  orderContentLabel: {
    fontSize: 14,
    fontWeight: "bold",
  },

  buttonGroup: {
    flexDirection: "row",
    backgroundColor: "#E0E0E0",
    borderBottomLeftRadius: stylesVar.borderRadius,
    borderBottomRightRadius: stylesVar.borderRadius,
    borderWidth: stylesVar.borderWidth,
    borderColor: stylesVar.borderColor,
  },
  buttonGroupButton: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
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
  buttonCancel: {
    backgroundColor: "#E4774C",
  },
  buttonValidate: {
    backgroundColor: "#74BF6A",
  },
  buttonPressed: {
    backgroundColor: "#BFBFBF",
  },
  buttonText: {
    color: "#000000",
    textAlign: "center",
  },
});

export default ChefOrderItem;
