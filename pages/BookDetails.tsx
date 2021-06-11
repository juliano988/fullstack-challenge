import { useNavigation, useRoute } from '@react-navigation/native';
import Constants from 'expo-constants';
import React, { useEffect } from 'react';
import { Button, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Book } from '../customTypes';
import { AntDesign } from '@expo/vector-icons';
import detailsBookBg from '../assets/detailsBookBg.png';

export default function BookDetails() {

  const navigation = useNavigation();

  const { book } = useRoute().params as { book: Book };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backArrow} onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <ImageBackground style={styles.bookBgImgView} source={detailsBookBg}>
          <Image style={styles.imageStyle} source={{ uri: book.cover }}></Image>
        </ImageBackground>
        <View style={styles.descriptionView}>
          <Text style={styles.bookTitlePlusSubtitle}>
            <Text style={styles.bookTitle}>{book.title}: </Text>
            <Text>{book.subtitle}</Text>
          </Text>
          <Text style={styles.bookAuthor}>{book.author}</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFCF9',
    marginTop: -25
  },
  backArrow: {
    position: 'relative',
    top: Constants.statusBarHeight + 40,
    left: 20,
    zIndex: 2
  },
  bookBgImgView: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    resizeMode: 'cover',
  },
  descriptionView: {
    flex: 6
  },
  imageStyle: {
    width: 150,
    height: 225,
    borderRadius: 5,
    marginBottom: -40
  },
  bookTitlePlusSubtitle: {
    marginTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 20
  },
  bookTitle: {
    fontWeight: 'bold'
  },
  bookAuthor: {
    fontSize: 16,
    paddingLeft: 20,
    marginTop: 10,
    color: '#fe6a79'
  },
});
