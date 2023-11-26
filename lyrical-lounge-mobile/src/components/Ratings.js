import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native'; 
import AddButton from './addRatingButton';
import Details from './Details';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { useUserContext } from './ProvideUser';
import LogoutButton from './LogoutButton';


const styles = StyleSheet.create({
  rowContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  topTextContainer: {
    flex: .2,
  },
  ratingHeaderText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 20,
    alignSelf: 'center',  
  },
  ratingsContainer: {
    display: 'flex',
    backgroundColor: '#2E2E2E',
    flex: 1, 
    flexGrow: 1,
    width: '100%',
  },
  scrollViewContainer: {
    flex: .4,
  },
  addButtonContainer: {
    flex: .4,
  },
  buttonContainer: {
    backgroundColor: '#404040', // Lighter color (adjust the alpha value as needed)
    padding: 10,
    margin: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '45%',
  },
  headerText: {
    alignSelf: 'center',
    color: 'white',
    fontWeight: '800',
    fontSize: 28,
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
  },  
  loginText: {
    alignSelf: 'center',
    color: 'white',
    fontWeight: '500',  
  },  
  buttonTextSmall: {
    color: 'white',
    fontWeight: '300',
    fontStyle: 'italic',
  },
});


function RatingDetail({ route }) {
  const { rating } = route.params;

  return (
    <View>
      <Text>{rating.song} by {rating.artist}</Text>
      <Text>Rating: {rating.rating}</Text>
    </View>
  );
}


function Ratings() {
  const [ratings, setRatings] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();

  //grabs user from context api
  const { user } = useUserContext();

  //styling for add rating button
  const styles2 = StyleSheet.create({
      buttonContainer: {
          backgroundColor: 'green', 
          padding: 10,
          margin: 5,
          borderRadius: 5,
          justifyContent: 'center',
          alignSelf: 'center',
          width: '90px',
        },
        buttonText: {
          color: 'white', 
          fontWeight: '600',
        },  
  })
  
  //gets list from database
     const getListRatings = async () => {
        try {
          const response = await fetch('http://129.133.185.47/Comp333-Project-Matt-Emmett-Mobile-App/lyrical-lounge-mobile/src/backend/index.php/rating/list');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json(); // Assuming the response is in JSON format
          console.log("data", data);
          return data;
        } catch (error) {
          console.error('Error:', error);
          throw error; // Rethrow the error to handle it at a higher level
        }
      }

    const fetchRatings = async () => {
        try {
          const ratings = await getListRatings();
          setRatings(ratings);
          console.log('List of Ratings:', ratings);
          // Now you can use the ratings data in your application
        } catch (error) {
          // Handle errors here
 
          console.error('Error fetching ratings:', error);
        }
      }

    useEffect(() => {
        fetchRatings();
        }, []);

    console.log(ratings);


      

    return (
      // top text
      <View style={styles.ratingsContainer}>
        <View style={styles.topTextContainer}>
          <Text style={styles.headerText}>Lyrical Lounge</Text>
          <Text style={styles.loginText}>You are logged in as: {user}</Text>
          <Text style={styles.ratingHeaderText}>Song Reviews</Text>
        </View>
        {/* scroll view for the reviews each rating is mapped to a pressable button*/}
        <ScrollView style={styles.scrollViewContainer}>
        {ratings.map((rating) => (
          <View key={rating.id}>
            <View style={styles.rowContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('Details', { rating, fetchRatings})}>
                <View style={styles.buttonContainer}>
                  <Text style={styles.buttonText}>
                    {rating.song} <Text style={styles.buttonTextSmall}>by {rating.artist}</Text>
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      {/* add button */}
      <View style={styles.addButtonContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('Add Rating', { fetchRatings: fetchRatings })}>
        <View style={styles2.buttonContainer}>
        <Text style={styles2.buttonText}>
              Add Rating
        </Text>
        </View>
      </TouchableOpacity>
      {/* statistics button */}
      <TouchableOpacity onPress={() => navigation.navigate('Statistics', { fetchRatings: fetchRatings })}>
        <View style={styles2.buttonContainer}>
        <Text style={styles2.buttonText}>
              Statistics
        </Text>
        </View>
      </TouchableOpacity>
        <LogoutButton></LogoutButton>
      </View>
    </View>

  );
    
  }
  
  export default Ratings;