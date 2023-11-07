/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// import messaging from '@react-native-firebase/messaging';

// messaging().setBackgroundMessageHandler(async remoteMessage => {
//     // Handle the background notification here
//     console.log('Received background notification', remoteMessage);
//   });
AppRegistry.registerComponent(appName, () => App);
console.disableYellowBox = true;