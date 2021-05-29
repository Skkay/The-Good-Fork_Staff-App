import React, { useState } from "react";
import { Text, View, StyleSheet, Pressable, Alert, Modal, TextInput } from "react-native";

import UnexpectedError from '../alert/UnexpectedError';
import postReservation from '../fetch/PostReservation';

const TableItem = ({ table, token, navigation }) => {
  const date = new Date(table.date);
  const [modalVisible, setModalVisible] = useState(false);
  const [customerName, setCustomerName] = useState("");

  const handlePressReservationButton = () => {
    console.log(table.date, table.service.id, table.table.id);
    if (customerName.trim()) {
      Alert.alert(
        "Confirmer la reservation ?",
        `Vous êtes sur le point de reserver une table de ${table.table.place} ${table.table.place > 1 ? "places" : "place" }, pour le service de ${table.service.startTime}h-${table.service.endTime}h le ${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} au nom de ${customerName.trim()}, confirmer ?`,
        [
          { text: "Annuler", onPress: () => console.log("Reservation canceled") }, 
          { text: "Oui", onPress: handleReserveTable }
        ]
      );
    }
  }

  const handleReserveTable = () => {
    postReservation(token, table.service.id, table.table.id, date, customerName.trim())
    .then((res) => {
      console.log("Reservation successfully placed", res);
      navigation.navigate('WaiterHome', {toastType: "reservation_success", toastExtra: res.data});
    })
    .catch((err) => {
      console.log("Error during reservation process", err);
      UnexpectedError(err.message);
    });
  }

  return (
    <View style={styles.reservation}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            <Text>Réserver à quel nom ?</Text>
            <TextInput 
              style={styles.textInput}
              onChangeText={setCustomerName}
              value={customerName}
              placeholder="Nom"
              maxLength={255}
            />
            <View style={styles.modalButtonGroup}>
              <Pressable style={({ pressed }) => [styles.modalButtonGroupButton, styles.modalButton, styles.modalButtonCancel, pressed && styles.modalButtonPressed]} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Annuler</Text>
              </Pressable>
              <Pressable style={({ pressed }) => [styles.modalButtonGroupButton, styles.modalButton, styles.modalButtonValidate, pressed && styles.modalButtonPressed]} onPress={handlePressReservationButton}>
                <Text style={[styles.modalButtonText, styles.modalButtonTextValidate]}>Valider</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.reservationHeader}>
        <Text style={styles.reservationDate}>{date.getDate().toString().padStart(2, '0')}/{(date.getMonth() + 1).toString().padStart(2, '0')}/{date.getFullYear()} - {table.service.startTime}h-{table.service.endTime}h</Text>
      </View>
      <View style={styles.reservationContent}>
        <View>
          <Text>{table.table.label}</Text>
          <Text>{table.table.place} {table.table.place > 1 ? "places" : "place" }</Text>
        </View>
        <Pressable
          style={styles.button}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.textButton}>Réserver</Text>
        </Pressable>
      </View>
    </View>
  );
};

const stylesVar = {
  borderRadius: 5,
  borderWidth: 1,
  borderColor: "#483100"
};
const styles = StyleSheet.create({
  reservation: {
    margin: 10,
  },
  reservationHeader: {
    backgroundColor: "#FFE9BA",
    borderTopLeftRadius: stylesVar.borderRadius,
    borderTopRightRadius: stylesVar.borderRadius,
    borderLeftColor: stylesVar.borderColor,
    borderTopColor: stylesVar.borderColor,
    borderRightColor: stylesVar.borderColor,
    borderLeftWidth: stylesVar.borderWidth,
    borderTopWidth: stylesVar.borderWidth,
    borderRightWidth: stylesVar.borderWidth,
  },
  reservationDate: {
    textAlign: "center",
  },
  reservationContent: {
    backgroundColor: "#FFFFFF",
    padding: 5,
    borderBottomLeftRadius: stylesVar.borderRadius,
    borderBottomRightRadius: stylesVar.borderRadius,
    borderLeftColor: stylesVar.borderColor,
    borderBottomColor: stylesVar.borderColor,
    borderRightColor: stylesVar.borderColor,
    borderLeftWidth: stylesVar.borderWidth,
    borderBottomWidth: stylesVar.borderWidth,
    borderRightWidth: stylesVar.borderWidth,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#FFBC2D",
    paddingHorizontal: 5,
    borderRadius: 3,
    justifyContent: "center",
  },
  textButton: {
    color: "#483100"
  },

  modalView: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 10,
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#000000",
    margin: 20,
    padding: 20
  },
  textInput: {
    borderWidth: 1,
    paddingHorizontal: 5,
    marginTop: 5,
    borderRadius: 5
  },
  modalButtonGroup: {
    flexDirection: "row",
    marginTop: 10,
  },
  modalButtonGroupButton: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  modalButton: {
    padding: 10,
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000000",
  },
  modalButtonCancel: {
    backgroundColor: "#FFFFFF",
  },
  modalButtonValidate: {
    backgroundColor: "#000000",
  },
  modalButtonPressed: {
    backgroundColor: "#BFBFBF",
  },
  modalButtonText: {
    color: "#000000",
    textAlign: "center",
    fontSize: 16,
  },
  modalButtonTextValidate: {
    color: "#FFFFFF",
  }
});

export default TableItem;
