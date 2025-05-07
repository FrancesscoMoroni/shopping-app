import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import i18next from "i18next";

import { Text, Modal, View, StyleSheet } from "react-native";
import { Pressable, TextInput } from "react-native";
import { Grocery } from "../interfaces/Grocery";


export default function ItemDialog({
  visible,
  onClose,
  onAccept,
  item,
  itemDispatch,
  onCameraTurnOn
}: {
  visible: boolean;
  onClose: Function;
  onAccept: Function;
  item: Grocery;
  itemDispatch: Function;
  onCameraTurnOn: Function;
}) {

  function hanldeOnAccept() {
    if(item.name !== "" && item.quanity !== "") {
      onAccept()
      itemDispatch({ type: 'reset'})
    } 
  }

  function handleOnClose() {
    onClose()
    itemDispatch({ type: 'reset'})
  }

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalView}>
        <View
          style={{
            flex: 0.2,
            flexDirection: "row",
          }}
        >
          <View style={{ flex: 0.9 }}>
            <Text style={{ fontSize: 20 }}>{item.id === -1 ? i18next.t("AddDialogHeader") : i18next.t("EditDialogHeader")}</Text>
          </View>
          <View style={{ flex: 0.1 }}>
            <Pressable onPress={() => handleOnClose()}>
              <View style={styles.dialogExitButton}>
                <Text style={{ fontSize: 13 }}>X</Text>
              </View>
            </Pressable>
          </View>
        </View>
        <View style={{ flex: 0.2, flexDirection: "row" }}>
          <View style={styles.textInput}>
            <TextInput
              placeholder={i18next.t("Name")}
              onChangeText={(text) => itemDispatch({ type: 'change-name', data: text})}
              value={item.name}
            />
          </View>
        </View>
        <View style={{ flex: 0.2, flexDirection: "row" }}>
          <View style={styles.quanityInput}>
            <TextInput
              placeholder={i18next.t("Amount")}
              keyboardType="numeric"
              onChangeText={(text) => itemDispatch({ type: 'change-quanity', data: text})}
              value={item.quanity}
            />
          </View>
          <View style={{ flex: 0.5 }}>
            <Picker
              style={{ flex: 1 }}
              selectedValue={item.unit}
              onValueChange={(text) => itemDispatch({ type: 'change-unit', data: text})}
            >
              <Picker.Item label="ml" value="ml" />
              <Picker.Item label="l" value="l" />
              <Picker.Item label="kg" value="kg" />
              <Picker.Item label="g" value="g" />
              <Picker.Item label={i18next.t("PieceShortcut")} value={i18next.t("PieceShortcut")} />
            </Picker>
          </View>
        </View>
        <View style={{ flex: 0.2, flexDirection: "row" }}>
          <View style={styles.textInput}>
            <TextInput
              placeholder={i18next.t("Barcode")}
              keyboardType="numeric"
              onChangeText={(text) => itemDispatch({ type: 'change-barcode', data: text})}
              value={item.barcode}
            />
          </View>
          <View style={{ flex: 0.3 }}>
            <Pressable style={styles.dialogCameraButton} onPress={() => onCameraTurnOn()}>
              <View>
                <Ionicons name="camera" size={18} />
              </View>
            </Pressable>
          </View>
        </View>
        <View style={{ flex: 0.2, flexDirection: "row" }}>
          <Pressable onPress={() => hanldeOnAccept()}>
            <View style={styles.dialogAcceptButton}>
              <Text>{item.id === -1 ? i18next.t("AddButton") : i18next.t("EditButton")}</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    margin: 40,
    marginTop: 100,
    height: 500,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    gap: 40,
  },
  textInput: {
    padding: 10,
    borderColor: "#000000",
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 20,
    flexWrap: "nowrap",
    flex: 1,
    margin: "auto",
  },
  quanityInput: {
    padding: 10,
    borderColor: "#000000",
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 20,
    flexWrap: "nowrap",
    flex: 0.5,
    margin: "auto",
  },
  dialogExitButton: {
    height: 40,
    width: 40,
    padding: 10,
    borderColor: "#000000",
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 20,
    alignItems: "center",
  },
  dialogAcceptButton: {
    height: 45,
    width: 90,
    padding: 10,
    borderColor: "#000000",
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 20,
    alignItems: "center",
  },
  dialogCameraButton: {
    padding: 10,
    borderColor: "#000000",
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 20,
    alignItems: "center",
    margin: "auto",
  },
});
