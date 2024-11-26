import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList, ActivityIndicator, Dimensions, PixelRatio } from 'react-native';
import { useEffect, useState } from 'react';
import ShoppingItem from './components/ShoppingItem';
import { MaterialIcons } from '@expo/vector-icons';
import { app, db, getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from './firebase/index';

const { width, height } = Dimensions.get('window');

export default function App() {
  const [title, setTitle] = useState("");
  const [shoppingList, setShoppingList] = useState([]);

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
    getShoppingList();
  };

  const getShoppingList = async () => {
    const querySnapshot = await getDocs(collection(db, "shopping"));
    const items = [];

    querySnapshot.forEach((doc) => {
      items.push({
        ...doc.data(),
        id: doc.id,
      });
    });

    setShoppingList(items);
  };

  const deleteShoppingList = async () => {
    const querySnapshot = await getDocs(collection(db, "shopping"));
    const deletePromises = querySnapshot.docs.map((item) =>
      deleteDoc(doc(db, "shopping", item.id))
    );
    await Promise.all(deletePromises);
    getShoppingList();
  };

  useEffect(() => {
    getShoppingList();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
<View style={styles.headerview}>
  {/* Header Title */}
  <Text style={styles.heading}>Shopping List</Text>

  {/* Items Count and Delete */}
  <View style={styles.actionContainer}>
    <Text style={styles.noofitems}>{shoppingList.length} items</Text>
    <TouchableOpacity style={styles.deleteButton} onPress={deleteShoppingList}>
      <MaterialIcons name="delete" size={20} color="#fff" />
    </TouchableOpacity>
  </View>
</View>



      {/* FlatList */}
      {shoppingList.length > 0 ? (
        <FlatList
          data={shoppingList}
          renderItem={({ item }) => (
            <ShoppingItem
              title={item.title}
              isChecked={item.isChecked}
              id={item.id}
              getShoppingList={getShoppingList}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6768" />
          <Text style={styles.loadingText}>Loading your shopping list...</Text>
        </View>
      )}

      {/* Input */}
      <TextInput
        placeholder="Enter your item"
        style={styles.input}
        value={title}
        onChangeText={(text) => setTitle(text)}
        onSubmitEditing={addShoppingItem}
      />
    </SafeAreaView>
  );
}

const responsiveFontSize = (fontSize) => {
  const scale = width / 375; // 375 is a typical width of a mobile screen
  return Math.round(PixelRatio.roundToNearestPixel(fontSize * scale));
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f8fa',
    alignItems: 'center',
  },
  headerview: {
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 25,
    backgroundColor: 'linear-gradient(90deg, #4CAF50, #2E7D32)', // Gradient effect
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  heading: {
    fontSize: responsiveFontSize(20),
    fontWeight: 'bold',
    color: '#000',
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  noofitems: {
    fontSize: responsiveFontSize(16),
    color: '#000',
    fontWeight: '600',
    marginRight: 10,
  },
  deleteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF6768',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FF6768',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    width: '100%',
  },
  loadingText: {
    marginTop: 10,
    fontSize: responsiveFontSize(16),
    fontWeight: '500',
    color: '#555',
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    fontSize: responsiveFontSize(16),
    borderRadius: 25,
    width: '90%',
    marginTop: 'auto',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  listItem: {
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 15,
    borderRadius: 10,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  listItemText: {
    fontSize: responsiveFontSize(16),
    fontWeight: '500',
    color: '#333',
  },
  buttonText: {
    color: '#fff',
    fontSize: responsiveFontSize(14),
    fontWeight: '600',
  },
});
