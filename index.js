import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import database from '@react-native-firebase/database';
// import firebase from '@react-native-firebase/app';

// const instance = firebase.initializeApp({
//   persistence: true,
// });

// can also use `keepSynced` / `setPersistence` methods:
// instance.database().ref('/someref').keepSynced();
// instance.database().setPersistence(true);

database().setPersistenceEnabled(true);
database().ref('users').keepSynced(true);

AppRegistry.registerComponent(appName, () => App);
