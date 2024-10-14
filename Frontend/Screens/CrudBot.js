import axios from 'axios';
import React, { useState, useEffect ,useContext} from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Checkbox } from 'react-native-paper'; // Assurez-vous d'avoir installé react-native-
import { GlobalContext } from "../context";

export default function CrudBots({ navigation, route }) {
  // Assurez-vous que les valeurs par défaut sont définies
  const { id, nomBotA = '', serviceA = '', tableBDA = '', regionA = '' } = route.params;
  const {API_URL , setAllBots} = useContext(GlobalContext);
  const [nomBot, setNomBot] = useState(nomBotA);
  const [selectedTables, setSelectedTables] = useState([]);
  const [service, setService] = useState(serviceA);
  const [region, setRegion] = useState(regionA);
  const [showTables, setShowTables] = useState(false);
  const [errors, setErrors] = useState({});

  // Exemples de tables (vous pouvez remplacer ceci par une liste réelle de tables)

  const tables = ['famille', 'menara_casite', 'menara_indsegment', 'menara_xnewclientw'];

  useEffect(() => {
    // Réinitialiser les valeurs lorsque les props changent
    setNomBot(nomBotA || '');
    setService(serviceA || '');
    setRegion(regionA || '');
    console.log(tableBDA)
    // Convertir tableBD en tableau et s'assurer que les valeurs sont correctes
    const initialSelectedTables = tableBDA ? tableBDA.split(',').map(table => table.trim()) : [];
    setSelectedTables(initialSelectedTables);
    console.log(initialSelectedTables);
  }, [nomBotA, serviceA, tableBDA, regionA]);

  const toggleTableSelection = (table) => {
    if (selectedTables.includes(table)) {
      setSelectedTables(selectedTables.filter((item) => item !== table));
    } else {
      setSelectedTables([...selectedTables, table]);
    }
  };
  const handleRemoveBot = async () => {
    console.log(id);
    try {
      const response = await axios.delete(`${API_URL}/bot/${id}`);
      console.log('Bot deleted successfully:', response.data);
      setAllBots(prevBots => prevBots.filter(bot => bot.id !== id));
      // Vous pouvez ajouter du code pour mettre à jour l'état ou informer l'utilisateur
    } catch (error) {
      console.error('Error deleting bot:', error.response ? error.response.data : error.message);
      // Gérez l'erreur de manière appropriée, par exemple en affichant un message à l'utilisateur
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

    if (valid) {
      Alert.alert(
        "Données envoyées",
        `NomBot: ${nomBot}, Tables: ${selectedTables.join(',')}, Service: ${service}, Région: ${region}`
      );
      console.log(`NomBot: ${nomBot}, Tables: ${selectedTables.join(', ')}, Service: ${service}, Région: ${region}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modifier le Bot</Text>

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
        <Text style={styles.buttonText}>Modifier</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleRemoveBot}>
        <Text style={styles.buttonText}>Supprimer</Text>
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
