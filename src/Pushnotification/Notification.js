import messaging from '@react-native-firebase/messaging';
import { Linking } from 'react-native';
import Sound from 'react-native-sound';

class PushNotifications {
  constructor() {
    // Initialize the Sound object
    this.soundObject = null;
    console.log("pushnotfiadfdsfdfsdfsdf              ++++++++++++++++++++++++++++++++++>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")

    // Register a background handler for when the app is not in the foreground.
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      this.handleNotification(remoteMessage);
    });

    // Register a foreground handler for when the app is in the foreground.
    messaging().onMessage(async remoteMessage => {
        console.log("notificaton sdadsfsdfasdfasdfa")
      this.handleNotification(remoteMessage);
    });
  }

  handleNotification(remoteMessage) {
    const { sound, title, body } = remoteMessage.notification;
    const soundFile = sound ? sound : 'custom_sound'; // Use 'default' if no sound is specified.

    // Initialize and play the sound
    this.soundObject = new Sound(`${soundFile}.mp3`, Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log(`Failed to load the sound ${soundFile}`, error);
      } else {
        
        this.soundObject.play();

        // Stop the sound after 10 seconds
        setTimeout(() => {
          if (this.soundObject.isPlaying()) {
            this.soundObject.stop();
            this.soundObject.release();
          }
        }, 10000); // 10 seconds in milliseconds
      }
    });
    
// alert('New alert received check it')
    // You can also display the notification here if needed.
    console.log(`Received notification: dsfsd ${title} - ${body}`);
  }
}

export default new PushNotifications();
