import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUserContext } from './ProvideUser';

const Login = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const {loginUser} = useUserContext();



  const handleSubmit = async () => {
    try {
      await login(username, password);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const login = async (username, password) => {
    try {
      const response = await fetch(
        'http://10.0.0.196/Comp333-Project-Matt-Emmett-TestingIntegration/lyrical-lounge-mobile/src/backEnd/index.php/user/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();

      console.log('Logged in status:', data);
      if (data.message === 'User logged in successfully') {
        // Handle successful login in React Native
        console.log('Successfully logged in!');
        setSuccessMessage('Log in successful!');
        console.log(username);
        setPassword('');
        setTimeout(() => setSuccessMessage(''), 3000);

        loginUser(username);
        navigation.navigate('Home');
      } else { //If user is not validated
        console.log('Invalid username or password!');
        setErrorMessage('Invalid username or password!');
        setUsername('');
        setPassword('');
        setTimeout(() => setErrorMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#2E2E2E' }}>
      <Text style={{ fontSize: 20, marginBottom: 20, color: 'white' }}>Lyrical Lounge Login</Text>
      <TextInput
        style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 10, backgroundColor: 'white', borderRadius: 5 }}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 10, backgroundColor: 'white', borderRadius: 5 }}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity onPress={handleSubmit} style={{ padding: 10, backgroundColor: 'yellow', borderRadius: 5, marginTop: 10 }}>
        <Text style={{ color: 'black' }}>Login</Text>
      </TouchableOpacity>
      <Text style={{ marginTop: 10, color: 'white' }}>Don't Have An Account?
      <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
        <Text style={{ color: 'blue', textDecorationLine: 'underline' }}> Register Here</Text>
      </TouchableOpacity>
      </Text>
      {successMessage ? <Text style={{ color: 'green', marginTop: 10 }}>{successMessage}</Text> : null}
      {errorMessage ? <Text style={{ color: 'red', marginTop: 10 }}>{errorMessage}</Text> : null}
    </View>
  );
};

export default Login;
