import React, { useContext, useEffect, useRef } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { GlobalContext } from "../context";
import { AntDesign } from "@expo/vector-icons";
import Chatcomponent from "../components/Chatcomponent";
import ChatBotcomponentN from "../components/ChatBotCompenentN";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function Chatscreen() {
  const {
    currentUser,
    setCurrentUser,
    setShowLoginView,
    allUsers,
    allChatRooms,
    setAllChatRooms,
    setIsLoggedIn,
    messages,
    setMessages,
    setAllUser,
    allUser,
    stompClientv,
    setStompClientv,
    API_URL,
    allBots,
    setAllBots,
  } = useContext(GlobalContext);

  const navigation = useNavigation();
  const scrollViewRef = useRef();

  // Fonction de déconnexion
  function handleLogout() {
    if (stompClientv && stompClientv.connected) {
      try {
        stompClientv.publish({
          destination: "/app/user.disconnectUser",
          body: JSON.stringify({
            id: currentUser.id,
            nickName: currentUser.nickName,
            fullName: currentUser.fullName,
            status: "OFFLINE",
            region: currentUser.region,
            role: currentUser.role,
            email: currentUser.email,
            password: currentUser.password,
          }),
        });
      } catch (error) {
        console.error("Error sending user data:", error);
      }
    } else {
      console.error("Cannot send user data, client not connected");
    }
    setCurrentUser("");
    setShowLoginView(true);
    navigation.navigate("Login");
  }

  // Connexion via WebSocket et STOMP
  const connect = () => {
    if (stompClientv && stompClientv.connected) {
      console.log("STOMP already connected");
      return;
    }

    const socket = new SockJS(`${API_URL}/ws`);
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      debug: (str) => console.log(str),
      onConnect: () => {
        console.log("Connected as:", currentUser.nickName);

        stompClient.subscribe(
          `/user/${currentUser.nickName}/queue/messages`,
          (message) => {
            onMessageReceived(message);
          }
        );

        stompClient.subscribe("/user/public", async () => {
          console.log("Public channel update");
          await findAndDisplayConnectedUsers();
        });

        registerUser();
      },
      onStompError: (error) => {
        console.error("STOMP Error:", error);
      },
      onDisconnect: () => {
        console.log("Disconnected");
        setIsLoggedIn(false);
      },
    });

    stompClient.activate();
    setStompClientv(stompClient);
  };

  // Récupération des bots
  const getbots = async () => {
    try {
      const listbots = await axios.get(`${API_URL}/bots`);
      setAllBots(listbots.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des bots:", error);
    }
  };

  // Gestion des messages reçus
  const onMessageReceived = async (message) => {
    try {
      const parsedMessage = JSON.parse(message.body);
      console.log("Received message:", parsedMessage);

      setMessages((prevMessages) => [...prevMessages, parsedMessage]);

      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }

      const notifiedUser = allUsers.find(
        (user) => user.nickName === parsedMessage.senderId
      );

      if (notifiedUser && !notifiedUser.isActive) {
        console.log("Notifying user:", notifiedUser.nickName);

        setAllUser((prevUsers) =>
          prevUsers.map((user) =>
            user.id === notifiedUser.id
              ? { ...user, isActive: true, backgroundColor: "#FFD700" }
              : user
          )
        );
      }
    } catch (error) {
      console.error("Error parsing message:", error);
    }
  };

  // Enregistrement de l'utilisateur
  const registerUser = () => {
    if (stompClientv && stompClientv.connected) {
      try {
        stompClientv.publish({
          destination: "/app/user.addUser",
          body: JSON.stringify({
            id: currentUser.id,
            nickName: currentUser.nickName,
            fullName: currentUser.fullName,
            status: "ONLINE",
            region: currentUser.region,
            role: currentUser.role,
            email: currentUser.email,
            password: currentUser.password,
          }),
        });
      } catch (error) {
        console.error("Error sending user data:", error);
      }
    } else {
      console.error("Cannot send user data, client not connected");
    }
  };

  // Recherche des utilisateurs connectés
  const findAndDisplayConnectedUsers = async () => {
    try {
      const connectedUsers = allUsers.filter(
        (user) => user.status !== "OFFLINE" && user.id !== currentUser.id
      );
      setAllChatRooms(connectedUsers);
    } catch (error) {
      console.error("Error fetching connected users:", error);
    }
  };

  const handleUserPress = (userId) => {
    setAllUser((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, backgroundColor: "#FFF" } : user
      )
    );
  };

  useEffect(() => {
    setAllUser(allUsers.filter((user) => user.id !== currentUser.id));
    connect();
    getbots();
  }, []);

  const handleButton1Press = () => {
    navigation.navigate("ListeBotAd");
  };

  const handleButton2Press = () => {
    alert("Button 2 Pressed");
  };

  return (
    <View style={styles.mainWrapper}>
      <View style={styles.topContainer}>
        <View style={styles.header}>
          <Text style={styles.heading}>Bonjour {currentUser.fullName} </Text>
          <Pressable onPress={handleLogout}>
            <AntDesign name="logout" size={30} color={"black"} />
          </Pressable>
        </View>
      </View>
      {currentUser.role === "SUPERADMIN" && (
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={handleButton1Press}>
            <Text style={styles.buttonText}>Crud Bots</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.button2]}
            onPress={handleButton2Press}
          >
            <Text style={styles.buttonText}>Crud Users</Text>
          </Pressable>
        </View>
      )}
      <ScrollView ref={scrollViewRef} style={styles.listContainer}>
        {allBots && allBots.length > 0 ? (
          <FlatList
            data={allBots}
            renderItem={({ item }) => <ChatBotcomponentN item={item} />}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <Text style={styles.noBotsText}>Aucun bot disponible</Text>
        )}
        {allUser && allUser.length > 0 ? (
          <FlatList
            data={allUser}
            renderItem={({ item }) => (
              <Chatcomponent item={item} onUserPress={handleUserPress} />
            )}
            keyExtractor={(item) => item.id}
          />
        ) : null}
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
    height: 40,
    width: "100%",
    padding: 10,
    justifyContent: "center",
    marginBottom: 15,
    flex: 0.1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    marginHorizontal: 10,
  },
  button: {
    flex: 1,
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginRight: 10,
  },
  button2: {
    backgroundColor: "#e74c3c",
    marginRight: 0,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  listContainer: {
    flex: 0.8,
    margin: 10,
  },
  noBotsText: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 10,
  },
});
