import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/Home_styles';
import { FlatList, NativeSyntheticEvent, SafeAreaView, Text, TextInput, TextInputChangeEventData, View } from 'react-native';
import { Foundation, Feather, Octicons, Ionicons } from '@expo/vector-icons';
import { Book, PageMeta } from '../customTypes';
import BookCard from '../components/BookCard';
import { useNavigation, useRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddBook from './AddBook';
import Profile from './Profile';
import { API_DOMAIN } from '../App';

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
          tabBarLabel: "Home",
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
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => <Ionicons name="person-outline" size={24} color={focused ? 'black' : '#BFBEBF'} />
        }}
      />
    </Tab.Navigator>
  );
}

function HomeMainContent() {

  const navigation = useNavigation();
  const route = useRoute();

  const [loading, setloading] = useState<boolean>(true);
  const [booksMeta, setbooksMeta] = useState<PageMeta>();
  const [booksArr, setbooksArr] = useState<Array<Book>>();
  const [searchQuery, setsearchQuery] = useState<string>();
  const [paginationLoading, setpaginationLoading] = useState<boolean>(false);
  const [searchTimeOut, setsearchTimeOut] = useState<NodeJS.Timeout>();

  const queryTextInputRef = useRef(null);

  useEffect(function () {
    setbooksArr([]);
    setsearchQuery('');
    (queryTextInputRef.current as unknown as TextInput).clear();

    setloading(true);
    fetch(API_DOMAIN+'/api/list-books').then(function (res) {
      return res.json();
    }).then(function (data: { meta: PageMeta, books: Array<Book> }) {
      setbooksMeta(data.meta)
      const actualBookList = data.books.slice();
      const actualBookListArrLength = actualBookList.length;
      if (actualBookListArrLength % 3) {
        for (let i = 1; i <= (3 - (actualBookListArrLength % 3)); i++) {
          actualBookList?.push({ title: ' ', subtitle: ' ', author: ' ', description: ' ', cover: ' ', fake: true })
        }
      }
      setbooksArr(actualBookList)
      setloading(false);
    })

  }, [(route.params as { bookAdded: boolean })?.bookAdded])

  function handleChangeQuery(query: string) {
    setsearchQuery(query);

    clearTimeout(searchTimeOut as NodeJS.Timeout);

    setpaginationLoading(true);
    setsearchTimeOut(setTimeout(function () {
      fetch(API_DOMAIN+'/api/list-books?q=' + query).then(function (res) {
        return res.json();
      }).then(function (data: { meta: PageMeta, books: Array<Book> }) {
        setbooksMeta(data.meta)
        const actualBookList = data.books.slice();
        const actualBookListArrLength = actualBookList.length;
        if (actualBookListArrLength % 3) {
          for (let i = 1; i <= (3 - (actualBookListArrLength % 3)); i++) {
            actualBookList?.push({ title: ' ', subtitle: ' ', author: ' ', description: ' ', cover: ' ', fake: true })
          }
        }
        setbooksArr(actualBookList);
        setpaginationLoading(false);
      })
    }, 1000));

  }

  function handleFlatListEnd() {
    if ((booksMeta?.page as number) < (booksMeta?.pages as number)) {
      setpaginationLoading(true);

      fetch(API_DOMAIN+'/api/list-books?p=' + ((booksMeta?.page as number) + 1) + '&q=' + (searchQuery || '')).then(function (res) {
        return res.json();
      }).then(function (data: { meta: PageMeta, books: Array<Book> }) {
        setbooksMeta(data.meta)
        const actualBookList = [...booksArr as Array<Book>, ...data.books];
        const actualBookListArrLength = actualBookList.length;
        if (actualBookListArrLength % 3) {
          for (let i = 1; i <= (3 - (actualBookListArrLength % 3)); i++) {
            actualBookList?.push({ title: ' ', subtitle: ' ', author: ' ', description: ' ', cover: ' ', fake: true })
          }
        }
        setbooksArr(actualBookList);
        setpaginationLoading(false);
      })

    }
  }

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.searchView}>
        <Foundation name="magnifying-glass" size={24} color="#DCD8D8" />
        <TextInput ref={queryTextInputRef} placeholder="Search book" style={styles.searchTextInput} onChangeText={(query) => handleChangeQuery(query)}></TextInput>
      </View>

      <Text style={styles.userNameText}>
        <Text >Hi, </Text>
        <Text style={styles.userNameTextName}>Mehmed Al Fatih 👋</Text>
      </Text>

      {!loading ?
        (booksArr?.length ?
          <FlatList
            numColumns={3}
            keyExtractor={(item, index) => index.toString(10)}
            data={booksArr}
            renderItem={({ item }) => (
              <BookCard
                cover={item.cover}
                title={item.title}
                author={item.author}
                goBookDetails={() => navigation.navigate('Book Details', { item })}
                fake={item.fake}
              />)}
            onEndReached={handleFlatListEnd}
            onEndReachedThreshold={0.1}
          /> :
          <View style={styles.searchErroAndLoadView}>
            <Text style={styles.searchErroAndLoadText}>Your search hasn't return any result.</Text>
          </View>
        ) :
        <View style={styles.searchErroAndLoadView}>
          <Text style={styles.searchErroAndLoadText}>Loading...</Text>
        </View>}

      {paginationLoading && <View style={styles.searchLoadingView}><Text>Looking for new books...</Text></View>}

    </SafeAreaView>
  )
}
