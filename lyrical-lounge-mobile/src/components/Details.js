import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import StarRating from 'react-native-star-rating';
import { useUserContext } from './ProvideUser';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2E2E2E', // Greyish black background
    justifyContent: 'flex-start', // Align content to the top
    alignItems: 'center',
    paddingTop: 20, // Add padding to separate content from top
  },
  songName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white', 
  },
  artistName: {
    fontSize: 16,
    fontStyle: 'italic',
    color: 'white', 
    marginTop: 5, // Add spacing between song name and artist name
  },
  rating: {
    fontSize: 18,
    marginTop: 10,
    color: 'white', // White text color
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 20,
    backgroundColor: 'yellow', 
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  buttonText: {
    color: 'black', 
    fontWeight: 'bold',
  },
});
  

function Details({ route }) {
  const { rating, fetchRatings} = route.params;
  const { user } = useUserContext();
  const currentUser = user;
  const navigation = useNavigation();


  console.log(currentUser);
  console.log(rating.username);

  // function to delete a rating
  const remove = async (id) => {
    try {
      console.log(id);
      const response = await fetch('http://129.133.185.47/Comp333-Project-Matt-Emmett-Mobile-App/lyrical-lounge-mobile/src/backend/index.php/rating/delete', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id,
          }),
        });
      console.log(id);
      console.log(response.data); // Log the response data
      fetchRatings();
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error deleting rating:', error);
    }
  };



  return (
    <View style={styles.container}>
      <Text style={styles.songName}>{rating.song}</Text>
      <Text style={styles.artistName}>by {rating.artist}</Text>
      <Text style={styles.rating}>Rating:</Text>
      <View style={styles.ratingContainer}>
        <StarRating
          disabled={true}
          maxStars={5}
          rating={rating.rating}
          starSize={20}
          fullStarColor="yellow"
          emptyStarColor="white"
        />
      </View>
      {rating.username === currentUser && (
        <View>
          <TouchableOpacity onPress={() => remove(rating.id)}>
            <View style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Delete</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            navigation.navigate('Edit Rating', {
              id: rating.id,
              rating: rating.rating,
              song: rating.song,
              artist: rating.artist,
              fetchRatings
            });
          }}>
            <View style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Edit</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

export default Details;