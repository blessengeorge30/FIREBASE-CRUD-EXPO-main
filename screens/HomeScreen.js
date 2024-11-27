import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { auth, onAuthStateChanged, signOut } from '../firebase/index';

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigation.navigate('Login'); // Redirect to login if user not authenticated
      }
    });

    return () => unsubscribe();
  }, [navigation]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User logged out');
      navigation.navigate('Login'); // Redirect to Login screen
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Shopping App</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  button: { backgroundColor: '#FF6768', padding: 15, borderRadius: 5, marginTop: 10 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
