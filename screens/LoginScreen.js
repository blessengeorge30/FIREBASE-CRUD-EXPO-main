import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ImageBackground } from 'react-native';
import { auth, signInWithEmailAndPassword } from '../firebase/index';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailValid, setEmailValid] = useState(true);  // To track email validity
  const [passwordValid, setPasswordValid] = useState(true);  // To track password validity

  const handleLogin = async () => {
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email);
    const isPasswordValid = password.length >= 6;

    setEmailValid(isEmailValid); // Update email validation state
    setPasswordValid(isPasswordValid); // Update password validation state

    if (isEmailValid && isPasswordValid) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        console.log('Login successful');
        navigation.navigate('Crud'); // Redirect to Home screen
      } catch (error) {
        console.error('Login failed:', error.message);
      }
    } else {
      console.log('Invalid email or password');
    }
  };

  return (
    <View style={styles.container}>
      {/* Top White Section */}
      <View style={styles.topSection}>
        <KeyboardAvoidingView
          style={styles.keyboardContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : null}
        >
          <View style={styles.formContainer}>
            <Text style={styles.title}>Welcome to Firebase-CRUD!</Text>

            {/* Email Input */}
            <TextInput
              style={[styles.input, 
                !emailValid ? styles.invalidInput : null, // Apply invalid style if email is not valid
              ]}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              onBlur={() => setEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))} // Validate email on blur
            />

            {/* Password Input */}
            <TextInput
              style={[styles.input, 
                !passwordValid ? styles.invalidInput : null, // Apply invalid style if password is not valid
              ]}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              onBlur={() => setPasswordValid(password.length >= 6)} // Validate password on blur
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.link}>Don't have an account? Sign Up</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>

      {/* Bottom Section with Background Image */}
      <ImageBackground
        source={require('../assets/bg.png')} // Path to your background image
        style={styles.backgroundImage}
      />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topSection: {
    flex: 7, // Take 70% of the screen height
    backgroundColor: '#FFF', // White background for the top part
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboardContainer: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  formContainer: {
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Transparent white background
    padding: 20,
    borderRadius: 15,
    marginHorizontal: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000', // Darker text for the title
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    fontSize: 16,
    color: '#000', // Black text for readability
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Semi-transparent white background
    borderColor: 'rgba(0, 0, 0, 0.2)', // Subtle border for better visibility
    borderWidth: 1,
  },
  invalidInput: {
    backgroundColor: 'rgba(255, 0, 0, 0.1)', // Light red background for invalid input
    borderColor: 'red', // Red border color for invalid input
  },
  button: {
    backgroundColor: '#FF3B30', // Red color for the button
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 15,
    elevation: 3,
    shadowColor: '#FF3B30',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  link: {
    marginTop: 15,
    textAlign: 'center',
    color: '#FF3B30', // Red for the link text
    fontWeight: '500',
  },
  backgroundImage: {
    position: 'absolute', // Make the background image absolute
    bottom: -300, // Position at the very bottom of the screen
    left: 0,
    right: 0,
    height: '62%', // 30% of the screen height
    width: '100%',
  },
});
