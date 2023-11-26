import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useUserContext } from './ProvideUser';


const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: 'red', // Example background color
        padding: 10,
        margin: 5,
        borderRadius: 5,
        justifyContent: 'center',
        alignSelf: 'center',
        width: '90px',
      },
      buttonText: {
        color: 'white', // Example text color
        fontWeight: '600',
      },  
})


//chat gpt helped with this
function LogoutButton(){
  const navigation = useNavigation();
  const {logoutUser} = useUserContext();

  const navigateToLogin = () => {
    logoutUser();
    navigation.navigate('Login');
  };
  //on logout will log user out and send them to login screen
    return (
     <TouchableOpacity onPress={navigateToLogin}>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>
            Logout
           </Text>
        </View>
      </TouchableOpacity>
    )
};

export default LogoutButton;