import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { color } from 'react-native-reanimated';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 20,
    backgroundColor: '#F2F2F2',
  },
  titleText: {
    color: '#FF6978',
    fontSize: 24,
    fontWeight: '600',
    paddingLeft: 20,
    paddingRight: 20,
  },
  formView: {
    marginTop: 20,
  },
  inputLabel: {
    fontSize: 16,
    marginTop: 10,
    paddingLeft: 15,
    marginBottom: 5
  },
  textInputField: {
    fontSize: 16,
    height: 50,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 5,
    backgroundColor: '#FDFCFC',
    shadowColor: 'rgba(212, 173, 134, 0.4926)',
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 80,
    elevation: 10
  },
  textInputFieldWrong: {
    fontSize: 16,
    height: 50,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 5,
    backgroundColor: '#FDFCFC',
    borderColor: 'red',
    borderStyle: 'solid',
    borderWidth: 1,
    shadowColor: 'rgba(212, 173, 134, 0.4926)',
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 80,
    elevation: 10
  },
  wrongLabelView: {
    flexDirection: 'row',
    alignItems: 'center',
    color: 'red',
    marginLeft: 15,
  },
  wrongLabelText: {
    color: 'red'
  },
  multilineTextInputView: {
    height: 190,
    textAlignVertical: 'top',
    paddingTop: 5,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 5,
    backgroundColor: '#FDFCFC',
    shadowColor: 'rgba(212, 173, 134, 0.4926)',
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 80,
    elevation: 10
  },
  multilineTextInputViewWrong: {
    height: 200,
    textAlignVertical: 'top',
    paddingTop: 5,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#FDFCFC',
    borderColor: 'red',
    borderStyle: 'solid',
    borderWidth: 1,
    shadowColor: 'rgba(212, 173, 134, 0.4926)',
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 80,
    elevation: 10
  },
  multilineTextInput:{
    height: 180,
    textAlignVertical: 'top',
    paddingTop: 5,
    paddingLeft: 5,
    borderRadius: 5,
    backgroundColor: '#FDFCFC',
  },
  coverPreviewText: {
    fontSize: 16,
    fontWeight: '600'
  },
  coverPreviewView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 20
  },
  getCoverButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 35,
    borderRadius: 5,
    backgroundColor: '#0d6efd',
    marginTop: 20,
    marginBottom: 5,
    marginLeft: 15,
    marginRight: 15,
  },
  getCoverButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600'
  },
  submitButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 5,
    backgroundColor: '#FF6978',
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20
  },
  submitButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600'
  }
});