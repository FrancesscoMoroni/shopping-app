import { Text, View, Button, StyleSheet, Pressable } from "react-native";
import { Grocery } from "../interfaces/Grocery";

export default function Item({
  item,
  onRemove,
  onSelect,
  onEdit
}: {
  item: Grocery;
  onRemove: Function;
  onSelect: Function;
  onEdit : Function;
}) {
  return (
    <View
      style={[
        styles.itemView,
        item.isSelected ? styles.itemViewSelected : styles.itemViewUnselected,
      ]}
    >
      <Pressable style={{flex: 0.8, flexDirection: "row"}} onPress={() => onSelect(item.id)} onLongPress={() => onEdit(item)}>
        <View style={styles.itemNameView}>
          <Text>{item.name}</Text>
        </View>
        <View style={styles.itemQuanityView}>
          <Text>
            {item.quanity} {item.unit}
          </Text>
        </View>
      </Pressable>
      <View style={styles.itemButtonView}>
        <Button
          onPress={() => {
            onRemove(item.id);
          }}
          title="X"
        ></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemView: {
    flex: 1,
    height: 70,
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: "row",
    borderColor: "#000000",
    borderStyle: "solid",
    borderWidth: 5,
    borderRadius: 10,
    margin: 5,
  },
  itemViewSelected: {
    backgroundColor: "#AAFF00",
  },
  itemViewUnselected: {
    backgroundColor: "#3346ff",
  },
  itemNameView: {
    flex: 0.5,
  },
  itemQuanityView: {
    flex: 0.5,
  },
  itemButtonView: {
    flex: 0.2,
  },
});
