import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';

const Registration = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    try {
      await submit();
    } catch (error) {
      console.error('Error submitting registration:', error);
    }
  };

  const submit = async () => {
    try {
      const response = await fetch("http://10.0.0.196/Comp333-Project-Matt-Emmett-TestingIntegration/lyrical-lounge-mobile/src/backEnd/index.php/user/create", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, confirm_password }),
      });

      const data = await response.json();

      if (data.message === 'User created successfully') {
        setSuccessMessage('User successfully created! Please go to login page.'); //send error message to screen
        setUsername('');
        setPassword('');
        setConfirm('');
        setTimeout(() => setSuccessMessage(''), 3000);
        
      } else if (data.error === 'Username already exists. Please choose a different username.') {
        // Handle existing username error
        setErrorMessage('Username already exists. Please choose a different username!');
        setUsername('');
        setPassword('');
        setConfirm('');
        setTimeout(() => setErrorMessage(''), 3000);

      } else if (data.error === 'Password and confirm password must match') {
        // Handle password mismatch error
        setErrorMessage('Password and confirm password must match!');
        setUsername('');
        setPassword('');
        setConfirm('');
        setTimeout(() => setErrorMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error submitting registration:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#2E2E2E' }}>
    <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20, color: 'white' }}>Registration Page</Text>

    <TextInput
      style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1, marginBottom: 10, backgroundColor: 'white', padding: 10, borderRadius: 5 }}
      placeholder="Username"
      value={username}
      onChangeText={(text) => setUsername(text)}
    />
    <TextInput
      style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1, marginBottom: 10, backgroundColor: 'white', padding: 10, borderRadius: 5 }}
      placeholder="Password"
      secureTextEntry
      value={password}
      onChangeText={(text) => setPassword(text)}
    />
    <TextInput
      style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1, marginBottom: 10, backgroundColor: 'white', padding: 10, borderRadius: 5 }}
      placeholder="Confirm Password"
      secureTextEntry
      value={confirm_password}
      onChangeText={(text) => setConfirm(text)}
    />
    <TouchableOpacity onPress={handleSubmit} style={{ padding: 10, backgroundColor: 'yellow', borderRadius: 5, marginTop: 10 }}>
      <Text style={{ color: 'black' }}>Register</Text>
    </TouchableOpacity>

    {successMessage ? <Text style={{ color: 'green', marginTop: 10 }}>{successMessage}</Text> : null}
    {errorMessage ? <Text style={{ color: 'red', marginTop: 10 }}>{errorMessage}</Text> : null}

    <Text style={{ marginTop: 10, color: 'white' }}>Already have an account?
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{ color: 'blue', textDecorationLine: 'underline' }}> Login Here</Text>
        </TouchableOpacity>
    </Text>
  </View>
);
}


export default Registration;
