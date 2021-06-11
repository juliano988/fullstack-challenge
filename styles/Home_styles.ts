import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#F2F2F2',
  },
  searchView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FDFCFC',
    width: '100%',
    borderRadius: 20,
    paddingLeft: 10,
    shadowColor: 'rgba(212, 173, 134, 0.122623)',
    shadowOffset: { width: 3, height: 5 },
    shadowRadius: 80,
    elevation: 10
  },
  searchTextInput: {
    height: 40,
    width: '100%',
    fontSize: 20,
    marginLeft: 5,
    marginRight: 10
  },
  userNameText: {
    fontSize: 25,
    marginTop: 10
  },
  userNameTextName: {
    color: '#fe6a79'
  },
  booksList: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10
  }
});