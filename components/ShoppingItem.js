import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import {db, doc, updateDoc, deleteDoc} from '../firebase/index'
const ShoppingItem = (props) => {
  const [isChecked, setIsChecked] = useState(props.isChecked);

  const updateIsChecked = async() => {
    const shoppingref = doc(db, "shopping", props.id);


await updateDoc(shoppingref, {
  isChecked: isChecked,
});

  };

  const deleteShoppingItem = async() => {
    await deleteDoc(doc(db, "shopping", props.id));
    props.getShoppingList();
  };

  useEffect(() => {
    updateIsChecked();

  }, [isChecked])

  return (
    <View style={styles.container}>
      {/* checkbox component */}
      <TouchableOpacity onPress={() => setIsChecked(!isChecked)}>

        {isChecked ? (
           <AntDesign name="checkcircle" size={24} color="white" />
        ): (
          <AntDesign name="checkcircleo" size={24} color="white" />
        )}
  
      </TouchableOpacity>

      {/* title */}
      <Text style={styles.txt}>
        {props.title}
      </Text>

      {/* delete button */}
      <TouchableOpacity style={styles.delete} onPress={deleteShoppingItem}>
        <MaterialIcons name="delete" size={24} color="#FF6768" />
      </TouchableOpacity>
    </View>
  );
}

export default ShoppingItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#282828",
    width: 360, // Set the width of the container
    borderRadius: 10,
    padding: 13,
    alignItems: "center",
    marginTop: 15,
    marginHorizontal:20
  },
  txt: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
    marginHorizontal: 15,
    flex: 1, 
  },
  delete: {
    alignSelf: 'flex-end',
    justifyContent: "center",
    padding: 2,
  }
});
