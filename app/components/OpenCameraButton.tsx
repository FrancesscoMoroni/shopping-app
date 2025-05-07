import i18next from "i18next";
import { StyleSheet, View, Pressable, Text } from "react-native";

export default function OpenCameraButton({ onTurnOn }: { onTurnOn: Function }) {
  return (
    <View style={styles.addButtonView}>
      <Pressable
        onPress={() => onTurnOn()}
        style={({ pressed }) =>
          pressed ? styles.addButtonPressed : styles.addButton
        }
      >
        <Text style={styles.addButtonText}>{i18next.t("Camera")}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  addButtonView: {
    flex: 0.5,
    backgroundColor: "#495E57",
    padding: 5,
    alignItems: "center",
  },
  addButton: {
    padding: 20,
    backgroundColor: "#F4CE14",
    borderRadius: 100,
    height: 90,
    width: 90,
  },
  addButtonPressed: {
    padding: 20,
    backgroundColor: "#DBB912",
    opacity: 0.8,
    borderRadius: 100,
    height: 90,
    width: 90,
  },
  addButtonText: {
    margin: "auto",
    fontSize: 13,
  },
});
