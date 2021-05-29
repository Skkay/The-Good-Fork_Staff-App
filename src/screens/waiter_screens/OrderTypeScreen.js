import React, { useContext, useState, useEffect } from "react";
import { Pressable, SafeAreaView, Text, StyleSheet, View, ActivityIndicator } from "react-native";

import DateTimePicker from '@react-native-community/datetimepicker';

import { AuthContext } from '../../components/AuthContext';
import ExpiredSession from '../../components/alert/ExpiredSession';
import UnexpectedError from '../../components/alert/UnexpectedError';
import fetchToken from '../../components/fetch/FetchToken';
import fetchTokenValidity from '../../components/fetch/FetchTokenValidity';
import postOrder from '../../components/fetch/PostOrder';

const OrderTypeScreen = ({ route, navigation }) => {
  const { cartData, extraInfo } = route.params
  const { signOut } = useContext(AuthContext);
  const [token, setToken] = useState(null);
  const [isValidToken, setValidToken] = useState(false);
  const [isPendingOrder, setPendingOrder] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null);

  /* DateTimePicker */
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [isDateValid, setDateValid] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    console.log(currentDate);
    setDateValid(currentDate < new Date());
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };


  const handlePlaceTakeOutOrder = () => {
    setPendingOrder(true);
    postOrder(token, cartData, extraInfo, false, date)
      .then((res) => {
        console.log("Take-out order successfully placed", res);
        // navigation.navigate('Home', {toastType: "order_success_takeout", toastExtra: res.data});
      })
      .catch((err) => {
        console.log("Error during take-out order process", err)
        setPendingOrder(false);
        UnexpectedError(err.message);
      });
  }

  const handleEatInOrder = () => {
    setPendingOrder(true);
    postOrder(token, cartData, extraInfo, true, null)
    .then((res) => {
      console.log("Eat-in order successfully placed", res);
      // navigation.navigate('Home', {toastType: "order_success_eatin", toastExtra: res.data});
    })
    .catch((err) => {
      console.log("Error during eat-in order process", err)
      setPendingOrder(false);
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
  }, [token, isValidToken]);

  return (
    <SafeAreaView>
      <View style={styles.buttonGroup}>
        <Pressable style={[styles.buttonRadio, selectedButton === 0 && styles.buttonRadioSelected]} onPress={() => setSelectedButton(0)}>
          <Text style={[styles.buttonRadioText, selectedButton === 0 && styles.buttonRadioTextSelected]}>Sur place</Text>
        </Pressable>
        <Pressable style={[styles.buttonRadio, selectedButton === 1 && styles.buttonRadioSelected]} onPress={() => setSelectedButton(1)}>
          <Text style={[styles.buttonRadioText, selectedButton === 1 && styles.buttonRadioTextSelected]}>À emporter</Text>
        </Pressable>
      </View>
      {selectedButton === 0 && (
        <Pressable style={({ pressed }) => [styles.nextButton, isDateValid && styles.nextButtonDisable, pressed && styles.buttonPressed]} onPress={handleEatInOrder} disabled={isDateValid}>
          <Text style={styles.nextButtonText}>Valider la commande</Text>
        </Pressable>
      )}
      {selectedButton === 1 && (
        <View style={styles.content}>
          <View style={styles.selectDateTime}>
            <Pressable style={({ pressed }) => [styles.buttonSelectDateTime, pressed && styles.buttonPressed]} onPress={showDatepicker}>
              <Text style={styles.buttonSelectDateTimeText}>Sélectionner la date</Text>
            </Pressable>
            <Text style={styles.textSelectedDateTime}>Le {date.getDate().toString().padStart(2, '0')}/{(date.getMonth() + 1).toString().padStart(2, '0')}</Text>
          </View>

          <View style={styles.selectDateTime}>
            <Pressable style={({ pressed }) => [styles.buttonSelectDateTime, pressed && styles.buttonPressed]} onPress={showTimepicker}>
              <Text style={styles.buttonSelectDateTimeText}>Sélectionner l'heure</Text>
            </Pressable>
            <Text style={styles.textSelectedDateTime}>À {date.getHours().toString().padStart(2, '0')}:{date.getMinutes().toString().padStart(2, '0')}</Text>
          </View>

          <Pressable style={({ pressed }) => [styles.nextButton, isDateValid && styles.nextButtonDisable, pressed && styles.buttonPressed]} onPress={handlePlaceTakeOutOrder} disabled={isDateValid}>
            <Text style={styles.nextButtonText}>Valider la commande</Text>
          </Pressable>
          {isPendingOrder && (<ActivityIndicator size="large" color="#000000" />)}
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: "#C3C3C3"
  },
  buttonRadio: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    backgroundColor: "#FFFFFF",
    borderColor: "#0090FF",
    borderWidth: 1,
    borderRadius: 20,
    marginHorizontal: 10,
    marginVertical: 30,
    paddingVertical: 5,
  },
  buttonRadioSelected: {
    backgroundColor: "#0090FF",
  },
  buttonRadioText: {
    textAlign: "center",
    fontSize: 20,
    color: "#0090FF",
  },
  buttonRadioTextSelected: {
    color: "#FFFFFF"
  },

  content: {
    margin: 5,
  },
  selectDateTime: {
    marginVertical: 20
  },
  buttonSelectDateTime: {
    backgroundColor: "#FFFFFF",
    borderColor: "#0090FF",
    borderWidth: 1,
    marginHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonPressed: {
    backgroundColor: "#034C85",
  },
  buttonSelectDateTimeText: {
    textAlign: "center",
    fontSize: 20,
    color: "#0090FF",
  },
  textSelectedDateTime: {
    textAlign: "center",
    color: "#034C85",
    fontSize: 16,
    fontWeight: "bold"
  },

  nextButton: {
    backgroundColor: "#0090FF",
    borderRadius: 10,
    marginTop: 10,
    marginHorizontal: 30,
    paddingVertical: 5,
  },
  nextButtonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 20,
  },
  nextButtonDisable: {
    backgroundColor: "#A8A8A8",
  },

  textCenter: {
    textAlign: "center",
  },
});

export default OrderTypeScreen;
