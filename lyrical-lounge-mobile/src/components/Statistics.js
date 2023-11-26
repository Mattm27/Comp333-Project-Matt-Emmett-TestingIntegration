import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native'; 
import AddButton from './addRatingButton';
import Details from './Details';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { useUserContext } from './ProvideUser';
import LogoutButton from './LogoutButton';

//CHAT gpt wrote the functions for the statistics for this file

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
    flex: .55,
  },
  addButtonContainer: {
    flex: .25,
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
  statistics: {
    alignItems: 'center',
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


function Statistics() {
  const [ratings, setRatings] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = useUserContext();

  
  const styles2 = StyleSheet.create({
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


    const getHighestRatedSong = () => {
        if (ratings.length === 0) {
          return null; // No ratings available
        }
    
        // Find the rating with the highest rating value
        const highestRated = ratings.reduce((maxRating, currentRating) => {
          return currentRating.rating > maxRating.rating ? currentRating : maxRating;
        });
    
        return highestRated.song;
      };
      
      const getLowestRatedSong = () => {
        if (ratings.length === 0) {
          return null; // No ratings available
        }
    
        // Find the rating with the lowest rating value
        const lowestRated = ratings.reduce((minRating, currentRating) => {
          return currentRating.rating < minRating.rating ? currentRating : minRating;
        });
    
        return lowestRated.song;
      };

      const calculateAverageRating = () => {
        if (ratings.length === 0) {
          return 0; // No ratings available
        }
    
        // Calculate the sum of all ratings
        const sumOfRatings = ratings.reduce((sum, rating) => sum + rating.rating, 0);
    
        // Calculate the average rating
        const averageRating = sumOfRatings / ratings.length;
    
        return averageRating;
      };

      const getNumberOfUsers = () => {
        const uniqueUsers = new Set(ratings.map((rating) => rating.username));
        return uniqueUsers.size;
      };

      const getNumberOfSongsByArtist = (artistName) => {
        // Filter ratings for the specified artist
        const artistRatings = ratings.filter((rating) => rating.artist === artistName);
        
        // Return the number of songs by the artist
        return artistRatings.length;
      };


      const artistName = "Justin Bieber";
      const numberOfSongsByArtist = getNumberOfSongsByArtist(artistName);
      const numberOfUsers = getNumberOfUsers();
      const averageRating = calculateAverageRating();
      const highestRatedSong = getHighestRatedSong();
      const lowestRatedSong = getLowestRatedSong();

    return (
    <View style={styles.ratingsContainer}>
        <View style={styles.topTextContainer}>
          <Text style={styles.headerText}>Lyrical Lounge</Text>
          <Text style={styles.loginText}>You are logged in as: {user}</Text>
          <Text style={styles.ratingHeaderText}>Statistics:</Text>
        </View>
        <View style={styles.statistics}>
            <Text style={styles.loginText}>Highest Rated Song: {highestRatedSong || 'No ratings yet'}</Text>
            <Text style={styles.loginText}>Lowest Rated Song: {lowestRatedSong|| 'No ratings yet'}</Text>
            <Text style={styles.loginText}>Average Rating: {averageRating.toFixed(2)}</Text>
            <Text style={styles.loginText}>Number of Ratings: {ratings.length}</Text>
            <Text style={styles.loginText}>Number of Users: {numberOfUsers}</Text>
            <Text style={styles.loginText}>Number of songs by {artistName}: {numberOfSongsByArtist}</Text>
        </View>


    </View>
  );
    
  }
  
  export default Statistics;