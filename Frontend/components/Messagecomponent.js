import { StyleSheet, Text, View } from "react-native";
import { GlobalContext } from "../context";
import React, { useContext } from 'react';

export default function MessageComponent({ currentUser, item }) {
  const isCurrentUser = item.senderId === currentUser.nickName;
  const {
    stompClientv, 
    setStompClientv,
    isLoggedIn,
  } = useContext(GlobalContext);
  
  // Styles conditionnels
  const messageItemWrapperStyle = isCurrentUser
    ? styles.messageItemWrapperCurrentUser
    : styles.messageItemWrapperOtherUser;

  const messageItemStyle = isCurrentUser
    ? [styles.messageItem, styles.currentUserMessage]
    : [styles.messageItem, styles.otherUserMessage];

  const messageTextStyle = isCurrentUser
    ? styles.currentUserMessageText
    : styles.messageText;

  return (
    <View style={messageItemWrapperStyle}>
      <View style={styles.messageItemInnerWrapper}>
        <View style={messageItemStyle}>
          <Text style={messageTextStyle}>
            {item.content}
          </Text>
        </View>
      </View>
      <View style={styles.messageInfo}>
        <Text style={styles.messageTime}>{item.timestamp}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  messageItemWrapperCurrentUser: {
    maxWidth: "80%",
    marginBottom: 2,
    padding: 10,
    alignSelf: "flex-end", // Aligne les messages de l'utilisateur actuel à droite
  },
  messageItemWrapperOtherUser: {
    maxWidth: "80%",
    marginBottom: 2,
    padding: 10,
    alignSelf: "flex-start", // Aligne les messages des autres utilisateurs à gauche
  },
  messageItemInnerWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  messageItem: {
    padding: 20,
    borderRadius: 10,
    marginBottom: 2,
    width: "100%",
  },
  currentUserMessage: {
    backgroundColor: "#E5DFD2", // Couleur de fond pour l'utilisateur actuel
  },
  otherUserMessage: {
    backgroundColor: "#D7CBAE", // Couleur de fond pour les autres utilisateurs
  },
  messageText: {
    color: "#000", // Couleur du texte pour les messages des autres utilisateurs
  },
  currentUserMessageText: {
    color: "#000", // Couleur du texte pour les messages de l'utilisateur actuel
  },
  messageInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  messageTime: {
    color: "#888",
    fontSize: 12,
  },
  messageUser: {
    fontWeight: 'bold',
    color: "#000",
  },
});
