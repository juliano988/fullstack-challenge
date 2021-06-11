import React, { useEffect } from 'react';
import styles from '../styles/AddBook_styles';
import { Button, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useForm, Controller } from "react-hook-form";

export default function AddBook() {

  const { control, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>Add a new book</Text>

      <ScrollView style={styles.formView}>
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
      </ScrollView>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit(onSubmit)} >
        <Text style={styles.submitButtonText}>Add new book</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}
