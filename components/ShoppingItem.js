import { Platform, Pressable, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
// import CheckBox from './CheckBox';
import { MaterialIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
// import { db, doc, deleteDoc, updateDoc} from "../Config";


// export type ShoppingItemProps = {
//   id: string;
//   isChecked: boolean;
//   title: string;
//   onRefresh: () => void;
// }

const ShoppingItem = (props) => {
//   const [isChecked,setIsChecked] = useState(props.isChecked);

  // delete specific item
//   const deleteShoppingItem = async() => {
//     await deleteDoc(doc(db, "Shopping", props.id)).then(()=>{
//       if(Platform.OS === "android"){
//         ToastAndroid.show(`${props.title} removed`, ToastAndroid.SHORT);
//       }
//       props.onRefresh();
//     });
    
//   }

  // update isChecked property
//   const updateIsChecked = async() => {
//     await updateDoc(doc(db, "Shopping", props.id),{
//       isChecked: isChecked
//     })
//   }

  // call function whenever isChecked property change
//   useEffect(()=>{
//     updateIsChecked();
//   },[isChecked])

  return (
    <View style={styles.container}>
      {/* checkbox component */}
<TouchableOpacity>
<AntDesign name="checkcircle" size={24} color="white" />
</TouchableOpacity>

        {/* title */}
        <Text style={styles.title }>  
          {props.title}
        </Text>
        {/* delete button */}
        <TouchableOpacity style={styles.delete} >
          <MaterialIcons name="delete" size={24} color="#FF6768" />
        </TouchableOpacity>
    </View>
  )
}

export default ShoppingItem

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        // alignSelf: "center",
        backgroundColor: "#282828",
        width: "90%",
        borderRadius: 10,
        padding: 13,
        alignItems: "center",
        marginTop: 15,  
    },
    title:{
        color: "#fff",
        fontSize: 20,
        flex: 1,
        fontWeight: "500"
    },
    delete:{
      alignItems: "center",
      justifyContent: "center",
      padding: 2,
      
    }
})