import { View, StyleSheet, ScrollView } from "react-native";
import Item from "./Item";
import AddItemButton from "./AddItemButton";
import { useEffect, useReducer, useState } from "react";
import ItemDialog from "./ItemDialog";
import OpenCameraButton from "./OpenCameraButton";
import Camera from "./Camera";
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeleteItemsButton from "./DeleteItemsButton";

function newItemReducer(state, action) {
  let newState = { ...state }

  switch (action.type) {
    case "change-all":
      newState.id = action.data.id
      newState.name = action.data.name
      newState.quanity = action.data.quanity
      newState.barcode = action.data.barcode
      newState.unit = action.data.unit
      newState.isSelected = action.data.isSelected
      break
    case "change-name":
      newState.name = action.data
      break
    case "change-quanity":
      newState.quanity = action.data
      break
    case "change-barcode":
      newState.barcode = action.data
      break
    case "change-unit":
      newState.unit = action.data
      break
    case "reset":
      newState = {
        id: -1,
        name: "",
        quanity: "",
        barcode: "",
        unit: "kg",
        isSelected: false
      }
      break
  }

  return newState
}

export default function Main() {

  const [newItemState, newItemDispatch] = useReducer(newItemReducer, {
    id: -1,
    name: "",
    quanity: "",
    barcode: "",
    unit: "kg",
    isSelected: false
  });

  const fetchData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('grocery-items');
      if (jsonValue != null) {
        const savedData = JSON.parse(jsonValue)
        setShoppingItems(savedData)
        setAnythingSelected(savedData.find((item) => item.isSelected) ? true : false)
      }

    } catch (e) { }
  }

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('grocery-items', jsonValue);
    } catch (e) { }
  };


  useEffect(() => {
    fetchData()

    return (() => {
      storeData()
    })
  }, [])


  const [shoppingItems, setShoppingItems] = useState([])
  const [visibleAddDialog, setVisibleAddDialog] = useState(false)
  const [visibleCamera, setVisibleCamera] = useState(false)
  const [anythingSelected, setAnythingSelected] = useState(false)

  function handleChangeItem() {
    let newItems = []

    if (newItemState.id === -1) {
      let id = 1

      while (shoppingItems.find((item) => item.id === id) !== undefined) {
        id++
      }

      newItems = [...shoppingItems, {
        id: id,
        name: newItemState.name,
        quanity: newItemState.quanity,
        barcode: newItemState.barcode,
        unit: newItemState.unit,
        isSelected: false
      }]
    } else {
      shoppingItems.map((item) => {
        newItems = [...newItems, item.id === newItemState.id ?
          { ...newItemState } : { ...item }
        ]
      })
    }


    setShoppingItems(newItems)

    storeData(newItems)
    handleDialogClose()
  }

  function handleRemoveItem(id) {
    let newItems = []
    shoppingItems.map((item) => {
      if (item.id !== id)
        newItems = [...newItems, {
          id: item.id,
          name: item.name,
          quanity: item.quanity,
          barcode: item.barcode,
          unit: item.unit,
          isSelected: item.isSelected
        }]
    })

    setShoppingItems(newItems)
    storeData(newItems)
  }

  function handleRemoveItems(id) {
    let newItems = []
    shoppingItems.map((item) => {
      if (!id.includes(item.id))
        newItems = [...newItems, {
          id: item.id,
          name: item.name,
          quanity: item.quanity,
          barcode: item.barcode,
          unit: item.unit,
          isSelected: item.isSelected
        }]
    })

    setShoppingItems(newItems)
    storeData(newItems)
  }

  function handleEditDialog({ id, name, quanity, unit, barcode, isSelected }) {
    newItemDispatch({
      type: 'change-all', data: {
        id: id,
        name: name,
        quanity: quanity,
        unit: unit,
        barcode: barcode,
        isSelected: isSelected
      }
    })

    handleDialogOpen()
  }

  function handleDialogClose() {
    setVisibleAddDialog(false)
  }

  function handleDialogOpen() {
    setVisibleAddDialog(true)
  }

  function handleTurnOnCamera() {
    setVisibleCamera(true)
  }

  function handleTurnOffCamera() {
    setVisibleCamera(false)
  }

  function handleBarcodeScan(barcode) {

    let findItem = shoppingItems.find((item) => item.barcode === barcode)

    if (findItem) {
      handleItemSelect(findItem.id)
    } else {
      newItemDispatch({ type: 'change-barcode', data: barcode })
      handleDialogOpen()
    }

    handleTurnOffCamera()
  }

  function handleItemSelect(id) {
    let newItems = []
    shoppingItems.map((item) => {
      newItems = [...newItems, {
        id: item.id,
        name: item.name,
        quanity: item.quanity,
        barcode: item.barcode,
        unit: item.unit,
        isSelected: id === item.id ? !item.isSelected : item.isSelected
      }]
    })

    setShoppingItems(newItems)
    setAnythingSelected(newItems.find((item) => item.isSelected) ? true : false)
    storeData(newItems)
  }

  function handleDeleteAllSelected() {
    let selectedIds = []

    shoppingItems.forEach((item) => {
      if (item.isSelected)
        selectedIds = [...selectedIds, item.id]
    })

    handleRemoveItems(selectedIds)
    setAnythingSelected(false)
  }

  return (
    <View style={styles.main}>
      {visibleCamera ?
        (<>
          <Camera onClose={handleTurnOffCamera} onScan={handleBarcodeScan} />
        </>)
        :
        (<ScrollView>
          <View style={
            {
              flex: 0.8
            }
          }>
            <ItemDialog visible={visibleAddDialog}
              onClose={handleDialogClose}
              onAccept={handleChangeItem}
              onCameraTurnOn={handleTurnOnCamera}
              itemDispatch={newItemDispatch}
              item={newItemState} />
            {shoppingItems.map((item) =>
              <Item key={item.id} item={item} onRemove={handleRemoveItem} onSelect={handleItemSelect} onEdit={handleEditDialog}></Item>
            )}
          </View>
          <View style={
            {
              fles: 0.2,
              flexDirection: "row"
            }
          }>
            <AddItemButton onAdd={handleDialogOpen} />
            {anythingSelected ? <DeleteItemsButton onDelete={handleDeleteAllSelected} /> : <></>}
            <OpenCameraButton onTurnOn={handleTurnOnCamera} />
          </View>
        </ScrollView>)
      }

    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 0.85,
    padding: 5
  }
});
