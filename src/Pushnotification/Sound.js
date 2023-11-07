import Sound from 'react-native-sound';
import SystemSetting from 'react-native-system-setting'

const handleNotification = (remoteMessage, soundObject) => {
    const { sound, title, body } = remoteMessage.notification;
    const soundFile = sound || 'custom_sound'; // Use 'custom_sound' if no sound is specified.

    // Initialize and play the sound
    soundObject = new Sound(`${soundFile}.mp3`, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log(`Failed to load the sound ${soundFile}`, error);
      } else {
        //get the current volume
SystemSetting.getVolume().then((volume)=>{
  console.log('Current volume is ' + volume);
});

// change the volume
SystemSetting.setVolume(1);
SystemSetting.getVolume().then((volume)=>{
  console.log('after volume ' + volume);
});
        soundObject.play();

        // Stop the sound after 10 seconds
        setTimeout(() => {
          if (soundObject.isPlaying()) {
            soundObject.stop();
            soundObject.release();
          }
        }, 10000); // 10 seconds in milliseconds
      }
    });

    // You can also display the notification here if needed.
    console.log(`Received notification sdfa: ${title} - ${body}`);
  };


  export default handleNotification