import { Text, View, StyleSheet } from "react-native";

export default function Footer() {
  return (
    <View style={styles.footerView}>
      <Text style={styles.footerText}>
        Fotter
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footerView: { 
    flex: 0.1, 
    backgroundColor: "#F4CE14", 
    alignItems: "center"
  },
  footerText: { 
    padding: 5, 
    fontSize: 15, 
    color: "black" 
  },
});