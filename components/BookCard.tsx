import React from 'react';
import styles from '../styles/BookCard_styles';
import { TouchableOpacity } from 'react-native';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function BookCard(props: { cover: string, title: string, author: string, goBookDetails: any }) {

  return (
    <TouchableOpacity style={styles.bookCardContainer} onPress={props.goBookDetails}>
      <Image style={styles.imageStyle} source={{ uri: props.cover }}></Image>
      <Text style={styles.titleText}>{props.title.length >= 15 ? props.title.slice(0,15)+'...' : props.title}</Text>
      <Text style={styles.authorText}>by {props.author.length >= 15 ? props.author.slice(0,15)+'...' : props.author}</Text>
    </TouchableOpacity>
  );
}
