import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
 
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
 
const PlayList = () => {
    return (
        <View style={styles.container}>
            <Text>PlayList</Text>
        </View>
    );
}

 
export default PlayList;