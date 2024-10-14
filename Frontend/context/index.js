import React, { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext(null);


function GlobalState({ children }) {
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUser, setCurrentUser] = useState("");// personne qui utilise app
  const [allUsers, setAllUsers] = useState([]);// tous  les utilisateurs de app
  const [allBots, setAllBots] = useState([]);
  const [allChatRooms, setAllChatRooms] = useState([]);// mes utilisateur qui connect sur app
  const [allChatMessages, setAllChatMessages] = useState([]);
  const [currentChatMessage, setCurrentChatMessage] = useState('');
  const [showLoginView, setShowLoginView] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [allUser, setAllUser] = useState([]);
  const [stompClientv, setStompClientv] = useState(null);
  const API_URL ='http://192.168.11.114:8082'
  return (
    <GlobalContext.Provider
      value={{
        API_URL,
        stompClientv, 
        setStompClientv,
        showLoginView,
        setShowLoginView,
        messages,
        setMessages,
        allBots, 
        setAllBots,
        messageText,
        setMessageText,
        loading,
        setLoading,
        error,
        setError,
        currentUserName,
        setCurrentUserName,
        currentUser,
        setCurrentUser,
        allUsers,
        setAllUsers,
        allChatRooms,
        setAllChatRooms,
        allChatMessages,
        setAllChatMessages,
        currentChatMessage,
        setCurrentChatMessage,
        isLoggedIn,
        setIsLoggedIn,
        allUser, 
        setAllUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalState;
