import React, { useEffect, useState } from 'react';
import styles from '../styles/Home_styles';
import { Text, TextInput, View } from 'react-native';
import { Foundation, Feather, Octicons } from '@expo/vector-icons';
import { Book, PageMeta } from '../customTypes';
import BookCard from '../components/BookCard';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddBook from './AddBook';

export default function Home() {

  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Home Page"
      tabBarOptions={{
        activeTintColor: 'black',
        inactiveTintColor: '#BFBEBF',
        activeBackgroundColor: '#F2F2F2',
        inactiveBackgroundColor: '#F2F2F2',
        labelStyle: { fontSize: 12 },
        style: {
          borderTopWidth: 0,
          elevation: 0
        }
      }}
    >
      <Tab.Screen
        name="Home Page"
        component={HomeMainContent}
        options={{
          tabBarIcon: ({ focused }) => <Feather name="home" size={26} color={focused ? 'black' : '#BFBEBF'} />
        }}
      />
      <Tab.Screen
        name="Add Book"
        component={AddBook}
        options={{
          tabBarIcon: ({ focused }) => <Octicons name="plus" size={26} color={focused ? 'black' : '#BFBEBF'} />
        }}
      />
    </Tab.Navigator>
  );
}

function HomeMainContent() {

  const navigation = useNavigation();

  const [loading, setloading] = useState<boolean>(false);
  const [bookCardArr, setbookCardArr] = useState<Array<typeof BookCard>>();

  useEffect(function () {
    fetch('http://192.168.0.38:3000/api/list-books').then(function (res) {
      return res.json();
    }).then(function (data: { meta: PageMeta, books: Array<Book> }) {
      const tempArr: Array<typeof BookCard> = [];
      data.books.forEach(function (book, i, arr) {
        tempArr.push(
          <BookCard
            cover={book.cover}
            title={book.title}
            author={book.author}
            goBookDetails={() => navigation.navigate('Book Details', { book })}
            key={i}
          /> as unknown as typeof BookCard)
      })
      setbookCardArr(tempArr);
      setloading(true);
    })
  }, [])

  return (
    <View style={styles.container}>

      <View style={styles.searchView}>
        <Foundation name="magnifying-glass" size={24} color="#DCD8D8" />
        <TextInput style={styles.searchTextInput}></TextInput>
      </View>

      <Text style={styles.userNameText}>
        <Text >Hi, </Text>
        <Text style={styles.userNameTextName}>Mehmed Al Fatih 👋</Text>
      </Text>

      {loading ?
        <View style={styles.booksList}>
          {bookCardArr}
        </View> :
        <></>}

    </View>
  )
}
