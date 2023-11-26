import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: 'green', // Example background color
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



function AddButton(){
  const navigation = useNavigation();

  const navigateToAdd = () => {
    navigation.navigate('Add Rating');
  };

    return (
      // button to add a rating
     <TouchableOpacity onPress={navigateToAdd}>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>
            Add Rating
           </Text>
        </View>
      </TouchableOpacity>
    )
};

export default AddButton;