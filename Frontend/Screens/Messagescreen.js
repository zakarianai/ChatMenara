import { useContext, useEffect, useLayoutEffect, useState } from "react";
import {
    FlatList,
    Keyboard,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { GlobalContext } from "../context";
import Messagecomponent from "../components/Messagecomponent";
import axios from "axios";

export default function Messagescreen({ navigation, route }) {
    const { id, fullName, nickname, status, region, role } = route.params;
    const {
        setAllChatMessages,
        allChatMessages,
        currentUser,
        currentChatMessage,
        setCurrentChatMessage,
        stompClientv,
        setStompClientv,
        allUsers,
        setAllUser,
        API_URL,
    } = useContext(GlobalContext);
    const [fetchedMessages, setFetchedMessages] = useState([]);
    const [messages, setMessages] = useState([]);
    // Variable pour stocker l'abonnement
let subscription;

const recevoirmessag = () => {
    const newMessage = {
        senderId: currentUser.nickName,
        recipientId: nickname,
        content: currentChatMessage,
        timestamp: new Date().toLocaleTimeString(),
    };

    // Assurez-vous de ne souscrire qu'une seule fois
    if (!subscription) {
        subscription = stompClientv.subscribe(`/user/${currentUser.nickName}/queue/messages`, (newMessage) => {
            onMessageReceived(newMessage);
        });
    }

    const onMessageReceived = async (message) => {
        try {
            const parsedMessage = JSON.parse(message.body);
            console.log('Received message:', parsedMessage);

            const messageWithTimestamp = {
                ...parsedMessage,
                timestamp: parsedMessage.timestamp || new Date().toLocaleTimeString(), // Ajout d'un timestamp si absent
            };

            // Vérifiez si le message existe déjà dans la liste pour éviter les doublonss
            setFetchedMessages(prevMessages => {
                if (!prevMessages.some(msg => msg.id === parsedMessage.id)) {
                    return [...prevMessages, messageWithTimestamp];
                }
                return prevMessages;  // Ne rien ajouter si duplicata
            });
            

        } catch (error) {
            console.error('Error parsing message:', error);
        }
    };
};
   

    useEffect(() => {
        // Fonction pour récupérer et afficher les messages utilisateur
        const fetchAndDisplayUserChat = async () => {
            console.log(currentUser.nickName);
            console.log(nickname);
            try {
                const response = await axios.get(`${API_URL}/messages/${currentUser.nickName}/${nickname}`);
                console.log("recevoir les messages");
                setFetchedMessages(response.data);
            } catch (error) {
                console.error('Error fetching user chat:', error);
            }
        };

        fetchAndDisplayUserChat();
        recevoirmessag();
    }, [id, currentUser.nickName]);


    function handleAddNewMessage() {
        if (currentChatMessage.trim() === "") return;
    
        const newMessage = {
            senderId: currentUser.nickName,
            recipientId: nickname,
            content: currentChatMessage,
            timestamp: new Date().toLocaleTimeString(),
        };
    
        // Vérifier si le client STOMP est connecté avant d'envoyer le message
        if (stompClientv && stompClientv.connected) {
            try {
                // Envoyer le message via STOMP/WebSocket
                stompClientv.publish({
                    destination: '/app/chat',
                    body: JSON.stringify(newMessage),
                });
    
                // Ajouter le nouveau message à la liste des messages
                setFetchedMessages([...fetchedMessages, newMessage]);
    
                // Réinitialiser le champ de saisie
                setCurrentChatMessage("");
                Keyboard.dismiss();
            } catch (error) {
                console.error('Erreur lors de l\'envoi du message:', error);
            }
        } else {
            console.error("Le client STOMP n'est pas connecté");
            // Vous pouvez afficher une notification ou effectuer une action en cas de déconnexion.
        }
    }
    

    return (
        <View style={styles.wrapper}>
            <View>
                <Text>User: {fullName}</Text>
                <Text>User: {nickname}</Text>
                <Text>id : {id}</Text>
            </View>
            <View style={[styles.wrapper, { paddingVertical: 15, paddingHorizontal: 10 }]}>
                {fetchedMessages && fetchedMessages.length > 0 ? (
                    <FlatList
                        data={fetchedMessages}
                        renderItem={({ item }) => (
                            <Messagecomponent item={item} currentUser={currentUser} />
                        )}
                        //keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
                        keyExtractor={(item, index) => `${item.id || item.timestamp}-${index}`}//{(item) => item.timestamp || item.id || Math.random().toString()}
                    />
                ) : (
                    <Text>No messages yet.</Text>
                )}
            </View>
            <View style={styles.messageInputContainer}>
                <TextInput
                    style={styles.messageInput}
                    value={currentChatMessage} a
                    onChangeText={(value) => setCurrentChatMessage(value)}
                    placeholder="Enter your message"
                />

                <Pressable onPress={handleAddNewMessage} style={styles.button}>
                    <View>
                        <Text style={styles.buttonText}>SEND</Text>
                    </View>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: "#eee",
    },
    messageInputContainer: {
        width: "100%",
        backgroundColor: "#fff",
        paddingVertical: 30,
        paddingHorizontal: 15,
        justifyContent: "center",
        flexDirection: "row",
    },
    messageInput: {
        borderWidth: 1,
        padding: 15,
        flex: 1,
        borderRadius: 50,
        marginRight: 10,
    },
    button: {
        width: "30%",
        backgroundColor: "#703efe",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
    },
    buttonText: {
        color: "#fff",
        fontSize: 20,
    },
});