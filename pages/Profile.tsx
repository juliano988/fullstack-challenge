import React from 'react';
import { View, Text } from "react-native";


export default function Profile(){
  return(
    <View style={styles.container}>
      <Text style={styles.text}>Profile Page</Text>
    </View>
  )
}

import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { color } from 'react-native-reanimated';

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent:'center',
    alignItems: 'center'
  },
  text:{
    fontSize: 16
  }
})