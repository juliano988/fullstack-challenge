import React, { SetStateAction, useEffect, useRef, useState } from 'react';
import styles from '../styles/AddBook_styles';
import { Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button, Platform, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import { Foundation } from '@expo/vector-icons';
import { Book } from '../customTypes';
import { useNavigation } from '@react-navigation/native';

export default function AddBook() {

  const navigation = useNavigation();

  const [bookCover, setbookCover] = useState<string>();
  const [loading, setloading] = useState<boolean>(false);
  const [bookAdded, setbookAdded] = useState(false);

  const scrollViewRef = useRef(null);

  const { control, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data: Book) => {
    data.cover = bookCover as string;
    const stringData = (JSON.stringify(data));

    setloading(true)
    fetch('http://192.168.0.38:3000/api/insert-book', { method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: stringData })
      .then(function (res) {
        return res.json()
      }).then(function (val) {
        reset({ title: '', subtitle: '', author: '', description: '' });
        setbookCover(undefined);
        setloading(false);
        setbookAdded(!bookAdded);
        navigation.navigate('Home Page',{bookAdded: bookAdded})
      })

  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  useEffect(function () {
    if (bookCover) {
      (scrollViewRef.current as unknown as ScrollView).scrollTo({
        y: Dimensions.get('window').width,
      });
    }
  }, [bookCover])

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [100, 150],
      base64: true,
      quality: 0.5,
    });
    if (!result.cancelled) {
      setbookCover(result.base64 ? 'data:image/jpeg;base64,' + result.base64 : result.uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>Add a new book</Text>

      <ScrollView style={styles.formView} ref={scrollViewRef}>
        <Text style={styles.inputLabel}>Title</Text>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={errors.title ? styles.textInputFieldWrong : styles.textInputField}
              onChangeText={value => onChange(value)}
              value={value}
            />
          )}
          name="title"
          rules={{ required: true }}
          defaultValue=""
        />
        {errors.title && <View style={styles.wrongLabelView}><Foundation name="alert" size={24} color="red" /><Text style={styles.wrongLabelText}> Field Title is required.</Text></View>}

        <Text style={styles.inputLabel}>Subtitle</Text>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={errors.title ? styles.textInputFieldWrong : styles.textInputField}
              onChangeText={value => onChange(value)}
              value={value}
            />
          )}
          name="subtitle"
          rules={{ required: true }}
          defaultValue=""
        />
        {errors.subtitle && <View style={styles.wrongLabelView}><Foundation name="alert" size={24} color="red" /><Text style={styles.wrongLabelText}> Field Subtitle is required.</Text></View>}

        <Text style={styles.inputLabel}>Author</Text>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={errors.title ? styles.textInputFieldWrong : styles.textInputField}
              onChangeText={value => onChange(value)}
              value={value}
            />
          )}
          name="author"
          rules={{ required: true }}
          defaultValue=""
        />
        {errors.author && <View style={styles.wrongLabelView}><Foundation name="alert" size={24} color="red" /><Text style={styles.wrongLabelText}> Field Author is required.</Text></View>}

        <Text style={styles.inputLabel}>Description</Text>
        <View style={errors.description ? styles.multilineTextInputWrong : styles.multilineTextInput}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.multilineTextInput}
                onChangeText={value => onChange(value)}
                value={value}
                multiline={true}
              />
            )}
            name="description"
            rules={{ required: true }}
            defaultValue=""
          />
        </View>
        {errors.description && <View style={styles.wrongLabelView}><Foundation name="alert" size={24} color="red" /><Text style={styles.wrongLabelText}> Field Description is required.</Text></View>}

        {bookCover &&
          <View style={styles.coverPreviewView}>
            <Text style={styles.coverPreviewText}>Cover preview: </Text>
            <Image source={{ uri: bookCover }} style={{ width: 100, height: 150 }} />
          </View>}

        <TouchableOpacity style={styles.getCoverButton} onPress={pickImage}>
          <Text style={styles.getCoverButtonText} >{bookCover ? 'Change' : 'Select'} the book cover</Text>
        </TouchableOpacity>

      </ScrollView>

      <View style={{ opacity: bookCover && !loading ? 1 : 0.5 }}>
        <TouchableOpacity disabled={bookCover && !loading ? false : true} style={styles.submitButton} onPress={handleSubmit(onSubmit)} >
          <Text style={styles.submitButtonText}>{loading ? 'Adding the book...' : 'Add new book'}</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}
