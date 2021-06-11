import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 20,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#F2F2F2',
  },
  titleText: {
    color: '#FF6978',
    fontSize: 24,
    fontWeight: '600'
  },
  formView:{
    marginTop: 20
  },
  inputLabel:{
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5
  },
  textInputField:{
    fontSize: 16,
    height: 50,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 5,
    backgroundColor: '#FDFCFC'
  },
  multilineTextInput:{
    height: 200,
    textAlignVertical: 'top',
    paddingTop: 5,
    paddingLeft: 5
  },
  submitButton:{
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 5,
    backgroundColor: '#FF6978',
    marginTop: 20,
    marginBottom: 20
  },
  submitButtonText:{
    color: 'white',
    fontSize: 24,
    fontWeight: '600'
  }
});