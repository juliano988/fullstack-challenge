import { useNavigation, useRoute } from '@react-navigation/native';
import Constants from 'expo-constants';
import React, { useContext, useEffect } from 'react';
import { Button, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Book } from '../customTypes';
import { AntDesign } from '@expo/vector-icons';
//@ts-ignore
import detailsBookBg from '../assets/detailsBookBg.png';

export default function BookDetails() {

  const navigation = useNavigation();

  const { book } = useRoute().params as { book: Book };

  return (
    <>
      <SafeAreaView style={styles.container}>

        <TouchableOpacity style={styles.backArrow} onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={30} color="black" />
        </TouchableOpacity>

        <ImageBackground style={styles.bookBgImgView} source={detailsBookBg}>
          <Image style={styles.imageStyle} source={{ uri: book.cover }}></Image>
        </ImageBackground>

        <View style={styles.bookInfoView}>
          <ScrollView style={{ height: 1 }}>
            <Text style={styles.bookTitlePlusSubtitle}>
              <Text style={styles.bookTitle}>{book.title}: </Text>
              <Text>{book.subtitle}</Text>
            </Text>
            <Text style={styles.bookAuthor}>{book.author}</Text>
            <Text style={styles.bookDescriptionText}>{book.description}</Text>
          </ScrollView>
        </View>

        <View style={styles.bookDetailsMenuView}>
          <View style={styles.bookDetailsMenuContent}>

          </View>
        </View>

      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFCF9',
    marginTop: -35
  },
  backArrow: {
    position: 'relative',
    top: Constants.statusBarHeight + 50,
    left: 20,
    zIndex: 2,
    width: 30
  },
  bookBgImgView: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    resizeMode: 'cover',
  },
  imageStyle: {
    width: 150,
    height: 225,
    borderRadius: 5,
    marginBottom: -40
  },
  bookInfoView: {
    flex: 6,
    marginTop: 50,
    marginLeft: 20,
    marginRight: 20,
  },
  bookTitlePlusSubtitle: {
    fontSize: 20
  },
  bookTitle: {
    fontWeight: 'bold'
  },
  bookAuthor: {
    fontSize: 16,
    marginTop: 5,
    color: '#fe6a79'
  },
  bookDescriptionText:{
    paddingTop: 10,
    paddingBottom: 80,
    lineHeight: 20
  },
  bookDetailsMenuView:{
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width:'100%',
    paddingLeft: 20,
    paddingRight: 20
  },
  bookDetailsMenuContent:{
    width: '100%',
    height: 50,
    backgroundColor: 'blue',
    borderRadius: 5
  }
});
