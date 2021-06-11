import React from 'react';
import styles from '../styles/BookCard_styles';
import { TouchableOpacity } from 'react-native';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function BookCard(props: { cover: string, title: string, author: string, goBookDetails: any }) {

  return (
    <TouchableOpacity onPress={props.goBookDetails}>
      <Image style={styles.imageStyle} source={{ uri: props.cover }}></Image>
      <Text style={styles.titleText}>{props.title}</Text>
      <Text style={styles.authorText}>by {props.author}</Text>
    </TouchableOpacity>
  );
}
