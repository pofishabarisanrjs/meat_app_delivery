import Sound from 'react-native-sound';
import Toast from 'react-native-toast-message';
import music from '../../assets/notificaton.wav'
const NotificationSound = new Sound(music, Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.error('Failed to load the sound', error);
  }
});

export const showNotificationWithSound = () => {
  console.log("je;;")
  Toast.show({
    type: 'success',
    text1: 'Notification',
    text2: 'This is a toast notification!',
    position: 'top',
    autoHide: true,
   
  });
};

