import i18next from "i18next";
import { Text, View, StyleSheet } from "react-native";

export default function Header() {
  return (
    <View style={styles.headerView}>
      <Text style={styles.headerText}>
        {i18next.t("Title")}
      </Text>
    </View>
  );
}


const styles = StyleSheet.create({
  headerView: { 
    flex: 0.15, 
    backgroundColor: "#F4CE14" 
  },
  headerText: { 
    padding: 40, 
    fontSize: 30, 
    color: "black" 
  },
});