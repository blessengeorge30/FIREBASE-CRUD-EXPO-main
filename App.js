import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import ShoppingItem from './components/ShoppingItem';
import { MaterialIcons } from '@expo/vector-icons';

import { app, db, getFirestore, collection, addDoc, getDocs } from './firebase/index'

export default function App() {
  const [title, setTitle] = useState("");
     
  const addShoppingItem = async () => {
    try {
      const docRef = await addDoc(collection(db, "shopping"), {
        title: title,
        isChecked: false
      });

      console.log("Document written with ID: ", docRef.id);
      setTitle("")
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const getShoppingList = async () => {  
    
    const querySnapshot = await getDocs(collection(db, "shopping"));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, doc.data());
    });

  }

  useEffect (() => {
    getShoppingList()
  },[])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerview}>
        {/* header */}
        <Text style={styles.heading}>
          Shopping List
        </Text>

        {/* no. of items  */}
        <Text style={styles.noofitems}>
          4
        </Text>

        {/* delete all */}
        <TouchableOpacity style={styles.delete} >
          <MaterialIcons name="delete" size={28} color="#FF6768" />
        </TouchableOpacity>

      </View>

      <ShoppingItem />
      <ShoppingItem />
      <ShoppingItem />
      <ShoppingItem />

      {/* textinput */}
      <TextInput
        placeholder='Enter your item'
        style={styles.input}
        value={title}
        onChangeText={(text) => setTitle(text)}
        onSubmitEditing={addShoppingItem} />



    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  headerview: {
    flexDirection: 'row',
    // backgroundColor:'red',
    width: '90%',
    padding: 10,
    // justifyContent: 'space-between',
    borderRadius: 10,
    marginBottom: 10,
  },
  noofitems: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 150,
    marginRight: 15
  },
  heading: {
    fontSize: 22,
    fontWeight: '600',

  },
  input: {
    backgroundColor: 'lightgrey',
    padding: 10,
    fontSize: 18,
    borderRadius: 10,
    width: '90%',
    marginTop: 'auto',
    paddingHorizontal: 20

  }
});
