import React, { useContext, useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, TextInput, Pressable, StyleSheet, ActivityIndicator, KeyboardAvoidingView, Keyboard, Platform, Alert } from 'react-native';
import axios from 'axios';
import { GlobalContext } from "../context";
import MessageBotcomponent from "../components/MessageBotcomponent";



const MessageBot = ({ navigation, route }) => {
    const { id, nomBotA, serviceA, tableBDA, regionA } = route.params;
    const { currentUser , API_URL} = useContext(GlobalContext);
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const flatListRef = useRef(null);
    console.log(currentUser);

    useEffect(() => {
        fetchMessages();
    }, []);

    useEffect(() => {
        // Faire défiler jusqu'en bas lorsque les messages changent
        flatListRef.current?.scrollToEnd({ animated: true });
    }, [messages]);

    const fetchMessages = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`${API_URL}/messages`);
            const bot1Messages = response.data.filter(message => message.reservername === nomBotA);
            setMessages(bot1Messages);
        } catch (error) {
            setError('Failed to fetch messages.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const sendMessage = async () => {
        if (!messageText.trim()) return; // Ne pas envoyer de messages vides

        try {
            Alert.alert(
                'Message Sent',
                'Your message has been sent successfully!',
                [{ text: 'OK' }]
            );
            setMessageText('');
            Keyboard.dismiss();
            const response = await axios.post(`${API_URL}/message/${id}`, { reservername: nomBotA , message: messageText , user : currentUser , senderId :currentUser.nickName });
            setMessages((prevMessages) => [...prevMessages, response.data]);
            fetchMessages()
        } catch (error) {
            setError('Failed to send message.');
            console.error(error);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.wrapper}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
        >
            <View style={styles.container}>
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : error ? (
                    <Text style={styles.error}>{error}</Text>
                ) : (
                    <FlatList
                        ref={flatListRef}
                        data={messages}
                        renderItem={({ item }) => (
                            <MessageBotcomponent item={item} currentUser={currentUser} />
                        )}
                        keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
                        contentContainerStyle={{ paddingBottom: 80 }}
                    />
                )}
                <View style={styles.messageInputContainer}>
                    <TextInput
                        style={styles.messageInput}
                        value={messageText}
                        onChangeText={setMessageText}
                        placeholder="Type your message"
                    />
                    <Pressable onPress={sendMessage} style={styles.button}>
                        <Text style={styles.buttonText}>SEND</Text>
                    </Pressable>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: "#eee",
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    messageInputContainer: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        backgroundColor: "#fff",
        paddingVertical: 15,
        paddingHorizontal: 10,
        flexDirection: "row",
        borderTopWidth: 1,
        borderTopColor: "#ccc",
    },
    messageInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 15,
        flex: 1,
        borderRadius: 50,
        marginRight: 10,
        backgroundColor: "#f9f9f9",
    },
    button: {
        width: "30%",
        backgroundColor: "#a49672",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
        padding: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
    },
});

export default MessageBot;
