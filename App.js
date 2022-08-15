import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AppNavigator from "./app/navigation/AppNavigator";
import AudioContext from "./Context/AudioContext";

export default function App() {
  return (
    <AudioContext>
      <NavigationContainer>
        <AppNavigator></AppNavigator>
      </NavigationContainer>
    </AudioContext>
  );
}
