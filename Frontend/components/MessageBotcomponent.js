import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MessageBotcomponent({ currentUser, item }) {
  const isCurrentUser = item.reservername === currentUser;

  return (
    <View style={isCurrentUser ? styles.messageItemWrapperCurrentUser : styles.messageItemWrapperOtherUser}>
      <View style={styles.messageItemInnerWrapper}>
        <View style={[styles.messageItem, isCurrentUser ? styles.currentUserMessage : styles.otherUserMessage]}>
          <Text style={isCurrentUser ? styles.currentUserMessageText : styles.messageText}>
            {item.message || ''}
          </Text>
        </View>
      </View>
      <View style={styles.messageInfo}>
        <Text style={styles.messageUser}>{item.senderId || 'BOT'}</Text>
        <Text style={styles.messageTime}>{new Date(item.date || new Date()).toLocaleString()}</Text>
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
