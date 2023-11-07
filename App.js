import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthProvider} from './AuthContext';
import ThemeManager, { useTheme } from './them';
import Navigation from './Navigation';
import InternetConnectionAlert from "react-native-internet-connection-alert";
import SplashScreen from 'react-native-splash-screen'
import messaging from '@react-native-firebase/messaging';
import Toast from 'react-native-toast-message';
import {View, StyleSheet, ToastAndroid, Button, StatusBar} from 'react-native';
import { DeviceEventEmitter } from 'react-native';
import KeepAwake from 'react-native-keep-awake';
import PushNotifications from './src/Pushnotification/Notification';

function App (){

  // Enable screen wake lock
KeepAwake.activate();

// Disable screen wake lock when your app goes to background
DeviceEventEmitter.addListener('appStateDidChange', (newState) => {
  if (newState === 'background') {
    KeepAwake.deactivate();
  }
});

  React.useEffect(() => {
    SplashScreen.hide();
    PushNotifications
  });

return (
    <InternetConnectionAlert
     onChange={(connectionState) => {
    // console.log("Connection State: ", connectionState);
     }}
     >
    <ThemeManager>
    <AuthProvider>   
          <Navigation/>
    </AuthProvider>
    </ThemeManager> 
    </InternetConnectionAlert>
  );
}


 
export default App;
