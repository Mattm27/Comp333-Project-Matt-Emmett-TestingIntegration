import React, {useState} from "react";
import axios from "axios";
import { View, TextInput, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'; 
import { useNavigation } from '@react-navigation/native';
import { useUserContext } from './ProvideUser';
import LogoutButton from './LogoutButton';
import StarRating from 'react-native-star-rating';
import { useRoute } from '@react-navigation/native';


const styles = StyleSheet.create({
  formContainer: {
    display: 'flex',
    backgroundColor: '#2E2E2E',
    flex: 1, 
    flexGrow: 1,
    width: '100%',
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '60%',
  },
  submitButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  topTextContainer: {
    
  },
  ratingHeaderText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 20,
    alignSelf: 'center',  
  },
  headerText: {
    alignSelf: 'center',
    color: 'white',
    fontWeight: '800',
    fontSize: 28,
  },
  loginText: {
    alignSelf: 'center',
    color: 'white',
    fontWeight: '500',  
  },  
});

function AddRating({route}){  
    const navigation = useNavigation();


    //variables that will need to be changed
    const [artist, setArtist] = useState('');
    const [song, setSong] = useState('');
    const [rating, setRating] = useState(1);
    //grabs current user from local storage
    const { user } = useUserContext();
    const { fetchRatings } = route.params || {};
    const [errorMessage, setErrorMessage] = useState("");

    //chatgpt wrote this
    const isFormValid = () => {
      return artist.trim() !== '' && song.trim() !== '';
    };
    
    //upon submission this function is ran chat gpt helped out with form submission
    const handleSubmit = async () => {
      //chat gpt used this for everything
      if (!isFormValid()) {
        setErrorMessage('Please fill out all fields!'); // Show an alert or provide feedback
        setTimeout(()=> setErrorMessage(''),3000);
        return;
      }
        try {
          await add(user, artist, song, rating);
          fetchRatings();
        } catch (error) {
          console.error('Error adding rating:', error);
        }
        navigation.navigate('Home');
      };  
    
      //adds to database
    const add = async (user, artist, song, rating) => {
        try {
          console.log(user, artist, song, rating);
      
          const response = await fetch('http://129.133.185.47/Comp333-Project-Matt-Emmett-Mobile-App/lyrical-lounge-mobile/src/backend/index.php/rating/create', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              artist: artist,
              username: user,
              song: song,
              rating: rating,
            }),
          });
      
          const data = await response.json();
      
          if (data.error === 'Song review already exists, please choose another song.') {
            setErrorMessage('Song review already exists, please choose another song.');
            setTimeout(()=> setErrorMessage(''),3000); //Send error message on screen
          } else {
            console.log(data);
          }
      
        } catch (error) {
          console.log('error was caught')
        }
        
      };
      
    
  return (
    <View style={styles.formContainer}>
      {/* text at top */}
      <View style={styles.topTextContainer}>
          <Text style={styles.headerText}>Lyrical Lounge</Text>
          <Text style={styles.loginText}>You are logged in as: {user}</Text>
          <LogoutButton></LogoutButton>
          <Text style={styles.ratingHeaderText}>Add a Rating</Text>
        </View>
        {/* artist input */}
      <TextInput
        placeholder="Artist"
        value={artist}
        onChangeText={(text) => setArtist(text)}
        style={styles.input}
      />
      {/* song input */}
      <TextInput 
        placeholder="Song"
        value={song}
        onChangeText={(text) => setSong(text)}
        style={styles.input}

      />
      {/* rating input */}
      <StarRating
        disabled={false}
        maxStars={5}
        minStars={1}
        rating={rating}
        selectedStar={(rating) => setRating(rating)}
        starSize={30}
        fullStarColor="yellow"
        emptyStarColor="white"
      />
      {/* submit button */}
       <TouchableOpacity style={styles.submitButton} onPress={() => handleSubmit()}>
         <Text style={styles.buttonText}>Add Rating</Text>
       </TouchableOpacity>

       {errorMessage ? <Text style={{ color: 'red', marginTop: 10 }}>{errorMessage}</Text> : null}
    </View>
  );
}

export default AddRating;
