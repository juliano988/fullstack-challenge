import React, { SetStateAction, useEffect, useRef, useState } from 'react';
import styles from '../styles/AddBook_styles';
import { Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button, Platform, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { useForm, Controller } from "react-hook-form";

export default function AddBook() {

  const [image, setImage] = useState<string>();
  const scrollViewRef = useRef<ScrollView>();

  const { control, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

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
    if (image) {
      (scrollViewRef.current as ScrollView).scrollTo({
        y: Dimensions.get('window').width,
        animated: true,
      });
    }
  }, [image])

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [100, 150],
      base64: true,
      quality: 0.5,
    });
    if (!result.cancelled) {
      setImage(result.base64 ? 'data:image/jpeg;base64,' + result.base64 : result.uri);
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
              style={styles.textInputField}
              onChangeText={value => onChange(value)}
              value={value}
            />
          )}
          name="title"
          rules={{ required: true }}
          defaultValue=""
        />
        {errors.title && <Text>This is required.</Text>}

        <Text style={styles.inputLabel}>Subtitle</Text>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.textInputField}
              onChangeText={value => onChange(value)}
              value={value}
            />
          )}
          name="subtitle"
          rules={{ required: true }}
          defaultValue=""
        />
        {errors.subtitle && <Text>This is required.</Text>}

        <Text style={styles.inputLabel}>Author</Text>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.textInputField}
              onChangeText={value => onChange(value)}
              value={value}
            />
          )}
          name="author"
          rules={{ required: true }}
          defaultValue=""
        />
        {errors.author && <Text>This is required.</Text>}

        <Text style={styles.inputLabel}>Description</Text>
        <View style={{ backgroundColor: 'white' }}>
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
        {errors.description && <Text>This is required.</Text>}

        {image &&
          <View style={styles.coverPreviewView}>
            <Text style={styles.coverPreviewText}>Cover preview: </Text>
            <Image source={{ uri: image }} style={{ width: 100, height: 150 }} />
          </View>}

        <TouchableOpacity style={styles.getCoverButton} onPress={pickImage}>
          <Text style={styles.getCoverButtonText} >{image ? 'Change the book cover' : 'Select the book cover'}</Text>
        </TouchableOpacity>

      </ScrollView>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit(onSubmit)} >
        <Text style={styles.submitButtonText}>Add new book</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}
