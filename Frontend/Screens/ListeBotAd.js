import React, { useContext, useEffect, useRef, useState } from "react";
import {
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    View,
    ScrollView,
    ActivityIndicator,
    Alert
} from "react-native";
import { GlobalContext } from "../context";
import ChatBotComponent from '../components/ChatBotCompenent';
import ChatBotcomponentN from "../components/ChatBotCompenentN";
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import { AntDesign } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function ListeBotAd() {
    const {
        allBots,
        setAllBots,
        currentUser
    } = useContext(GlobalContext);
    const navigation = useNavigation(); // Initialiser le hook useNavigation
    const scrollViewRef = useRef();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fonction pour récupérer les bots
        const fetchBots = async () => {
            try {
                // Remplacez l'URL par celle de votre API
                //const response = await axios.get("https://api.example.com/bots");
                //setAllBots(response.data);
                setAllBots(bots)
            } catch (err) {
                setError(err.message);
                Alert.alert("Erreur", "Impossible de charger les bots");
            } finally {
                setLoading(false);
            }
        };

        fetchBots();
    }, [setAllBots]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={styles.loadingText}>Chargement...</Text>
            </View>
        );
    }
    const handleAddBots = () => {navigation.navigate('AddBotForm') }

    return (
        <View style={styles.mainWrapper}>
            <View style={styles.topContainer}>
                <View style={styles.header}>
                    <Text style={styles.heading}>Ajoute un BOT : </Text>
                    <Pressable onPress={handleAddBots}>
                        <Ionicons name="add-circle-outline" size={24} color="black" />
                    </Pressable>
                </View>
            </View>
            <ScrollView ref={scrollViewRef} style={styles.listContainer}>
                {allBots && allBots.length > 0 ? (
                    <FlatList
                        data={allBots}
                        renderItem={({ item }) => <ChatBotComponent item={item} />}
                        keyExtractor={(item) => item.id}
                    />
                ) : (
                    <Text style={styles.noBotsText}>Aucun bot disponible</Text>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    mainWrapper: {
        backgroundColor: "#eee",
        flex: 1,
    },
    topContainer: {
        backgroundColor: "#fff",
        height: 50,
        marginTop:5,
        width: "100%",
        padding: 10,
        justifyContent: "center",
        marginBottom: 15,
        
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    heading: {
        fontSize: 20,
        fontWeight: "bold",
    },
    listContainer: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#000',
    },
    noBotsText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 18,
        color: '#555',
    },
});
