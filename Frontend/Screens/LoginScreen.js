import React, { useContext, useState, useEffect } from 'react';
import { Alert, Image, Pressable, SafeAreaView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GlobalContext } from '../context'; // Assurez-vous que le chemin est correct
import axios from 'axios';


const logo = require('../assets/logo_menara.png');

export default function LoginForm() {
  const navigation = useNavigation();
  const {
    setCurrentUser,
    allUsers,
    setAllUsers,
    API_URL,
  } = useContext(GlobalContext);

  const [click, setClick] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const GETusers = `${API_URL}/users`;

  useEffect(() => {
    getusers();
  }, []);

  const getusers = async () => {
    try {
      const listeuser = await axios.get(GETusers);
      setAllUsers(listeuser.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };

  const handleLogin = async (username, password) => {
    try {
      
      // Assurez-vous que allUsers est un tableau
      if (!Array.isArray(allUsers)) {
        Alert.alert("Erreur", "Données utilisateurs non valides.");
        return;
      }
  
      // Trouvez l'utilisateur
      const user = allUsers.find(user => user.email === username);
      console.log('Found user:', user); // Debugging line
  
      if (!user) {
        Alert.alert("Erreur", "Email incorrect.");
        return;
      }
      if (user.password !== password) {
        Alert.alert("Erreur", "Mot de passe incorrect.");
        return;
      }
      ///////////////////////////////*WEBSOCKET*////////////////////////////////////////////////////////
      // En cas de succès
      Alert.alert("Succès", `Login réussi pour ${user.fullName} avec le rôle ${user.role}`);
      setCurrentUser(user); // Mise à jour du contexte
      navigation.navigate('Chatscreen');
    } catch (error) {
      Alert.alert("Erreur", `Échec du login : ${error.message}`);
    }
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <Image source={logo} style={styles.image} resizeMode='contain' />
      <Text style={styles.title}>Welcome</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder='Email Or Username'
          placeholderTextColor='gray'
          value={username}
          onChangeText={setUsername}
          autoCorrect={false}
          autoCapitalize='none'
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          placeholderTextColor='gray'
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          autoCorrect={false}
          autoCapitalize='none'
        />
      </View>
      <View style={styles.rememberView}>
        <View style={styles.switch}>
          <Switch
            value={click}
            onValueChange={setClick}
            trackColor={{ true: "green", false: "gray" }}
          />
          <Text style={styles.rememberText}>Remember Me</Text>
        </View>
        <View>
          <Pressable onPress={() => Alert.alert("Forget Password!")}>
            <Text style={styles.forgetText}>Forgot Password?</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.buttonView}>
        <Pressable style={styles.button} onPress={() => handleLogin(username, password)}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 10,
  },
  image: {
    height: 120,
    width: 250,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
    paddingVertical: 40,
    color: '#a49672',
  },
  inputView: {
    gap: 15,
    width: "100%",
    paddingHorizontal: 40,
    marginBottom: 10,
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 7,
  },
  rememberView: {
    width: "100%",
    paddingHorizontal: 50,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 8,
  },
  switch: {
    flexDirection: "row",
    gap: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  rememberText: {
    fontSize: 13,
  },
  forgetText: {
    fontSize: 11,
    color: '#DD393A',
  },
  button: {
    backgroundColor: '#a49672',
    height: 45,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonView: {
    width: "100%",
    paddingHorizontal: 50,
  },
  footerText: {
    textAlign: "center",
    color: "gray",
  },
});
