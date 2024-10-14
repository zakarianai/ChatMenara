import { Pressable, StyleSheet, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import { useContext, useEffect } from "react";
import { GlobalContext } from "../context";
import { useNavigation } from "@react-navigation/native";

export default function ChatBotcomponent({ item ,onUserPress }) {
  const navigation = useNavigation();
  const {setAllUser} = useContext(GlobalContext);
   
  function handleNavigateTo() {
    navigation.navigate("CrudBot", {
      id :item.id,
      nomBotA:item.nomBot,
      serviceA: item.service,
      tableBDA :item.tableBD,
      regionA: item.region,
    });
  }

  return (
    <Pressable style={[styles.chat, { backgroundColor: item.backgroundColor || '#FFF' }]} onPress={handleNavigateTo}>
      <View style={styles.circle}>
      <FontAwesome5 name="robot" size={24} color="black" />
      </View>
      <View style={styles.rightContainer}>
        <View>
          <Text style={styles.userName}>
            {item.nomBot ? item.nomBot : "Unknown User"}
          </Text>
          <Text style={styles.message}>
            {item.service ? item.service : "Status Unknown"}
          </Text>
        </View>
        <View>
          <Text style={styles.time}>
            {item.region ? item.region : "No Region"}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chat: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
    height: 80,
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: "bold",
  },
  message: {
    fontSize: 14,
    opacity: 0.8,
  },
  rightContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  time: {
    opacity: 0.6,
  },
  circle: {
    width: 50,
    borderRadius: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    marginRight: 10,
  },
});
