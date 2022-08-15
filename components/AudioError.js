import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
 
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
 
const AudioError = ({msg}) => {
    return (
        <View style={styles.container}>
            <Text>{msg}</Text>
        </View>
    );
}

 
export default AudioError;