import React from 'react';
import styles from '../styles/BookDetails_styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Image, ImageBackground, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Book } from '../customTypes';
import { AntDesign, FontAwesome5, Feather } from '@expo/vector-icons';
//@ts-ignore
import detailsBookBg from '../assets/detailsBookBg.png';

export default function BookDetails() {

  const navigation = useNavigation();

  const { item } = useRoute().params as { item: Book };

  return (
    <>
      <SafeAreaView style={styles.container}>

        <TouchableOpacity style={styles.backArrow} onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={30} color="black" />
        </TouchableOpacity>

        <ImageBackground style={styles.bookBgImgView} source={detailsBookBg}>
          <Image style={styles.imageStyle} source={{ uri: item.cover }}></Image>
        </ImageBackground>

        <View style={styles.bookInfoView}>
          <ScrollView style={{ height: 1 }}>
            <Text style={styles.bookTitlePlusSubtitle}>
              <Text style={styles.bookTitle}>{item.title}{item.subtitle && ': '}</Text>
              <Text>{item.subtitle}</Text>
            </Text>
            <Text style={styles.bookAuthor}>{item.author}</Text>
            <Text style={styles.bookDescriptionText}>{item.description}</Text>
          </ScrollView>
        </View>

        <View style={styles.bookDetailsMenuView}>
          <View style={styles.bookDetailsMenuContent}>
            <TouchableOpacity style={styles.bookDetailsMenuButton}>
              <Feather name="book-open" size={24} color="#CFCBD2" />
              <Text style={styles.bookDetailsMenuButtonText}>Read</Text>
            </TouchableOpacity>
            <View style={styles.bookDetailsMenuBar}></View>
            <TouchableOpacity style={styles.bookDetailsMenuButton}>
              <FontAwesome5 name="headphones" size={24} color="#CFCBD2" />
              <Text style={styles.bookDetailsMenuButtonText}>Listen</Text>
            </TouchableOpacity>
            <View style={styles.bookDetailsMenuBar}></View>
            <TouchableOpacity style={styles.bookDetailsMenuButton}>
              <Feather name="share" size={24} color="#CFCBD2" />
              <Text style={styles.bookDetailsMenuButtonText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>

      </SafeAreaView>
    </>
  );
}