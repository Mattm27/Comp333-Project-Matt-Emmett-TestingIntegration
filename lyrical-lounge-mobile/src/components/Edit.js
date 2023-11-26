import React, {useState} from "react";
import { View, TextInput, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'; 
import { useRoute } from '@react-navigation/native';
import LogoutButton from './LogoutButton';
import StarRating from 'react-native-star-rating';
import { useUserContext } from './ProvideUser';
import { useNavigation } from '@react-navigation/native';


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


function EditRating(){  
  const route = useRoute();
  //get vairables passed through nav
  const { id, rating: initialRating, song: initialSong, artist: initialArtist, fetchRatings} = route.params;

  

    //variables that will need to be changed
    const [artist, setArtist] = useState(initialArtist);
    const [song, setSong] = useState(initialSong);
    const [rating, setRating] = useState(initialRating);

    //get user using the context api
    const { user } = useUserContext();
    const navigation = useNavigation();
    const [errorMessage, setErrorMessage] = useState("");
    console.log(user);


    //delete rating function
    const remove = async (id) => {
      try {
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
      } catch (error) {
        console.error('Error deleting rating:', error);
      }
    };
    //chat wrote this function it is to make sure they fill in teh boxing 
    const isFormValid = () => {
      return artist.trim() !== '' && song.trim() !== '';
    };
    //upon submission this function is ran chat gpt helped out with form submission
    const handleSubmit = async () => {
      if (!isFormValid()) {
        setErrorMessage('Please fill out all fields!'); // Show an alert or provide feedback
        setTimeout(()=> setErrorMessage(''),3000);
        return;
      }
        try {
          await add(id, artist, song, rating);
          fetchRatings();
        } catch (error) {
          console.error('Error adding rating:', error);
        }
        
      };
    
    const add = async (id, artist, song, rating) => {
        try {
          console.log(id, artist, song, rating);
      
          const response = await fetch('http://129.133.185.47/Comp333-Project-Matt-Emmett-Mobile-App/lyrical-lounge-mobile/src/backend/index.php/rating/edit', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              artist: artist,
              id: id,
              song: song,
              rating: rating,
            }),
          });
      
          const data = await response.json();
      
          if (data.error === 'Song review already exists, please choose another song.') {
            setErrorMessage('Song review already exists, please choose another song.'); //sends error message
            setTimeout(()=> setErrorMessage(''),3000);
          } else {
            console.log(data);
          }
      
        } catch (error) {
        }
        navigation.navigate('Home');
      };
      
    
  return (
    <View style={styles.formContainer}>
      <View style={styles.topTextContainer}>
          <Text style={styles.headerText}>Lyrical Lounge</Text>
          <Text style={styles.loginText}>You are logged in as: {user}</Text>
          <LogoutButton></LogoutButton>
          <Text style={styles.ratingHeaderText}>Edit Rating</Text>
        </View>
      <TextInput
        placeholder={artist}
        value={artist}
        onChangeText={(text) => setArtist(text)}
        style={styles.input}
      />
      <TextInput
        value={song}
        onChangeText={(text) => setSong(text)}
        style={styles.input}
        
      />
      <StarRating
        disabled={false}
        maxStars={5}
        rating={rating}
        selectedStar={(rating) => setRating(rating)}
        starSize={30}
        fullStarColor="yellow"
        emptyStarColor="white"
      />
       <TouchableOpacity onPress={() => handleSubmit()} style={styles.submitButton}><Text style={styles.buttonText}>Edit Rating</Text></TouchableOpacity>
       {errorMessage ? <Text style={{ color: 'red', marginTop: 10 }}>{errorMessage}</Text> : null}
    </View>
  );
}

export default EditRating;
