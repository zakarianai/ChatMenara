import axios from 'axios';
import React, { useState,useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Checkbox } from 'react-native-paper'; // Vous devez installer react-native-paper pour utiliser ce composant
import { GlobalContext } from "../context";
import { useNavigation } from '@react-navigation/native';

export default function AddBotForm() {
  const navigation = useNavigation();
  const {API_URL , setAllBots} = useContext(GlobalContext);
  const [nomBot, setNomBot] = useState('');
  const [selectedTables, setSelectedTables] = useState([]);
  const [service, setService] = useState('');
  const [region, setRegion] = useState('');
  const [showTables, setShowTables] = useState(false);
  const [errors, setErrors] = useState({});

  // Exemples de tables
  const tables = ['famille', 'menara_casite', 'menara_indsegment', 'menara_xnewclient'];

  const toggleTableSelection = (table) => {
    if (selectedTables.includes(table)) {
      setSelectedTables(selectedTables.filter((item) => item !== table));
    } else {
      setSelectedTables([...selectedTables, table]);
    }
  };

  const handleAddBot = () => {
    // Réinitialiser les erreurs
    setErrors({});

    let valid = true;
    let newErrors = {};

    if (!nomBot) {
      newErrors.nomBot = 'Veuillez entrer le nom du bot';
      valid = false;
    }
    if (selectedTables.length === 0) {
      newErrors.tables = 'Veuillez sélectionner au moins une table';
      valid = false;
    }
    if (!service) {
      newErrors.service = 'Veuillez entrer le service';
      valid = false;
    }
    if (!region) {
      newErrors.region = 'Veuillez entrer la région';
      valid = false;
    }

    setErrors(newErrors);

    const handleSubmit = async () => {
      if (valid) {
        try {
          // Afficher une alerte avec les données envoyées
          Alert.alert(
            "Données envoyées",
            `NomBot: ${nomBot}, Tables: ${selectedTables.join(', ')}, Service: ${service}, Région: ${region}`
          );
          console.log(`NomBot: ${nomBot}, Tables: ${selectedTables.join(', ')}, Service: ${service}, Région: ${region}`);
           // Créer l'objet bot avec des propriétés cohérentes
          const bot = {
            nomBot: nomBot,
            tableBD: selectedTables.join(', '),
            service: service,
            region: region
          };
          // Envoyer la requête POST
          const response = await axios.post(`${API_URL}/bot`, bot);
          Alert.alert(
            "Succès",
            "Le bot a été ajouté avec succès."
          );
          setAllBots(prevBots => [...prevBots, response.data]);
          // Réinitialiser les champs ou faire d'autres actions après l'envoi réussi
          setNomBot('');
          setSelectedTables([]);
          setService('');
          setRegion('');
          navigation.navigate('ListeBotAd');
          
        } catch (error) {
          console.error('Erreur lors de l\'envoi des données:', error.response ? error.response.data : error.message);
          
          // Afficher une alerte ou un message d'erreur en cas d'échec
          Alert.alert(
            "Erreur",
            "Une erreur est survenue lors de l'ajout du bot. Veuillez réessayer."
          );
        }
      }
    };
    handleSubmit();
    
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajouter un Bot</Text>

      <TextInput
        style={styles.input}
        placeholder="Nom du Bot"
        value={nomBot}
        onChangeText={setNomBot}
      />
      {errors.nomBot && <Text style={styles.errorText}>{errors.nomBot}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Service"
        value={service}
        onChangeText={setService}
      />
      {errors.service && <Text style={styles.errorText}>{errors.service}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Région"
        value={region}
        onChangeText={setRegion}
      />
      {errors.region && <Text style={styles.errorText}>{errors.region}</Text>}

      <TouchableOpacity style={styles.toggleButton} onPress={() => setShowTables(!showTables)}>
        <Text style={styles.toggleButtonText}>
          {showTables ? "Masquer la sélection des tables" : "Sélectionner les tables"}
        </Text>
      </TouchableOpacity>

      {showTables && (
        <View style={styles.tableList}>
          {tables.map((table) => (
            <View key={table} style={styles.checkboxContainer}>
              <Checkbox
                status={selectedTables.includes(table) ? 'checked' : 'unchecked'}
                onPress={() => toggleTableSelection(table)}
              />
              <Text style={styles.checkboxLabel}>{table}</Text>
            </View>
          ))}
          {errors.tables && <Text style={styles.errorText}>{errors.tables}</Text>}
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={handleAddBot}>
        <Text style={styles.buttonText}>Ajouter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 10,
    marginBottom: 8,
  },
  toggleButton: {
    backgroundColor: '#a49672',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 16,
  },
  toggleButtonText: {
    color: 'white',
    fontSize: 16,
  },
  tableList: {
    marginBottom: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkboxLabel: {
    fontSize: 16,
  },
  button: {
    backgroundColor: '#a49672',
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
    fontSize: 14,
  },
});
