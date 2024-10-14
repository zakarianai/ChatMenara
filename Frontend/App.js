import React from 'react';
import { View, Image, Text } from 'react-native'; // Ajoutez cette ligne pour importer les composants nécessaires
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GlobalState from './context'; 
import LoginScreen from './Screens/LoginScreen'; 
import Chatscreen from './Screens/Chatscreen'; 
import Messagescreen from './Screens/Messagescreen';
import MessageBot from './Screens/MessageBot';
import CrudBot from './Screens/CrudBot';
import ListeBotAd from'./Screens/ListeBotAd';
import AddBotForm from './Screens/AddBot';
import Add_User from './Screens/Add_User';

const Stack = createStackNavigator();

export default function App() {
  return (
    <GlobalState>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen 
            name="Login" 
            component={LoginScreen}
            options={{
              headerTitle: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    style={{ width: 40, height: 40 }} 
                    source={require('./assets/logo.png')} 
                    resizeMode="contain"
                  />
                  <Text style={{ marginLeft: 10, fontSize: 19, fontWeight: 'bold', color:'#3d3c3b' }}>
                    Menara chat
                  </Text>
                </View>
              ),
              headerTitleAlign: 'left',
            }}
          />
          <Stack.Screen 
            name="Chatscreen" 
            component={Chatscreen}
          />
          <Stack.Screen 
            name="Messagescreen" 
            component={Messagescreen}
          />
          <Stack.Screen 
            name="MessageBot" 
            component={MessageBot}
          />
          <Stack.Screen 
            name="CrudBot" 
            component={CrudBot}
          />
          <Stack.Screen 
            name="ListeBotAd" 
            component={ListeBotAd}
          />
          <Stack.Screen 
            name="AddBotForm" 
            component={AddBotForm}
          />
          <Stack.Screen 
            name="Add_User" 
            component={Add_User}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalState>
  );
}
