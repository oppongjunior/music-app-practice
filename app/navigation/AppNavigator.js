import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import AudioList from "../screens/AudioList";
import Player from "../screens/Player";
import PlayList from "../screens/PlayList";

//Icons
import { Ionicons, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import Colors from "../../Colors/Colors";


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const Tab = createBottomTabNavigator();
const AppNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="AudioList"
        component={AudioList}
        options={{
          tabBarIcon: () => (
            <Ionicons name="md-headset-outline" size={24} color={Colors.ACTIVE_BG} />
          ),
          headerStyle:{
            backgroundColor:Colors.ACTIVE_BG,
          },
          headerTintColor:"#fff",
          headerShadowVisible:true,
          headerTitle:"ALL SONGS",
          headerTitleStyle:{
            fontSize:14,
            letterSpacing:2,
          },
          tabBarLabelStyle:{
            color:Colors.ACTIVE_BG,
            letterSpacing:1
          },
          tabBarLabel:"SONGS"
        }}
      />
      <Tab.Screen name="Player" component={Player} options={{
          tabBarIcon: () => (
            <FontAwesome5 name="compact-disc" size={24} color={Colors.ACTIVE_BG} />
          ),
          headerStyle:{
            backgroundColor:Colors.ACTIVE_BG,
          },
          headerTintColor:"#fff",
          headerShadowVisible:true,
          headerTitle:"ALL SONGS",
          headerTitleStyle:{
            fontSize:14,
            letterSpacing:2,
          },
          tabBarLabelStyle:{
            color:Colors.ACTIVE_BG,
            letterSpacing:1
          },
        }} />
      <Tab.Screen name="PlayList" component={PlayList} options={{
          tabBarIcon: () => (
            <MaterialIcons name="library-music" size={24} color={Colors.ACTIVE_BG} />
          ),
          headerStyle:{
            backgroundColor:Colors.ACTIVE_BG,
          },
          headerTintColor:"#fff",
          headerShadowVisible:true,
          headerTitle:"ALL SONGS",
          headerTitleStyle:{
            fontSize:14,
            letterSpacing:2,
          },
          tabBarLabelStyle:{
            color:Colors.ACTIVE_BG,
            letterSpacing:1
          },
        }} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
