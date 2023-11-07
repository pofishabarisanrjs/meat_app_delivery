import 'react-native-gesture-handler';
import React, { useContext, useEffect, useState } from 'react';
import { Alert, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IconBadge from 'react-native-icon-badge';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import neworder from '../screens/neworder';
import acceptedorder from '../screens/acceptedorder';
import pickedup from '../screens/pickedup'
import ProfileScreen from '../screens/ProfileScreen';
import { AuthContext } from '../../../AuthContext';
import messaging from '@react-native-firebase/messaging';
import { StyleSheet, ToastAndroid, Button, PermissionsAndroid } from 'react-native';
import base_url from '../../constants/Constant';
import Sound from 'react-native-sound';
import SystemSetting from 'react-native-system-setting'

const Tab = createBottomTabNavigator();
const TOPIC = 'MyNews';

const BottomNavigator = (props) => {
  const [orderedlist, setorderedlist] = useState([]);
  const [loading, setLoading] = useState([]);
  const [alerttab, setAlerts] = useState(false);

  const { userInfo, numbers, Refresh, setRefresh } = useContext(AuthContext);
  const token = userInfo?.auth_token
  const { navigation } = props
  console.log("token", token)
  const requestUserPermission = async () => {
    /**
     * On iOS, messaging permission must be requested by
     * the current application before messages can be
     * received or sent
     */
    // await PermissionsAndroid.request(
    //   PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    // );

    const authStatus = await messaging().requestPermission();
    console.log('Authorization status(authStatus):', authStatus);
    return (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    );
  };

  const Acceptorder = () => {
    console.log({
      "delivery_guy_id": userInfo.id,
      "order_id": acceptorderid,
      "token": token,
    })

    fetch(`${base_url}/delivery/accept-to-deliver`, {
      method: 'POST',
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        "delivery_guy_id": id,
        "order_id": acceptorderid,
        "token": token,
      }),
    })
      .then((response) => (response.json()))
      .then((result) => {
        // console.log('name',result)
        setacceptdata(result); Ordered();
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));

  }
  const handleNotification = (remoteMessage, soundObject) => {
    const { sound, title, body } = remoteMessage.notification;
    const soundFile = sound || 'custom_sound'; // Use 'custom_sound' if no sound is specified.

    // Initialize and play the sound
    soundObject = new Sound(`${soundFile}.mp3`, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log(`Failed to load the sound ${soundFile}`, error);
      } else {
        if (!alerttab) {
          setAlerts(true)
          Alert.alert(
            remoteMessage?.data?.unique_order_id,
            'New order arrived !!!!',
            [
              {
                text: 'Rejected',
                onPress: () => {
                  console.log('close')
                  setAlerts(false);
                  soundObject.stop();
                },
                style: 'cancel',
              },
              {
                text: 'Accept',
                onPress: () => {
                  console.log('close')
                  setAlerts(false);
                  soundObject.stop();

                }
              },
            ],
            { cancelable: true }
          );

        }

        soundObject.play();

        // Stop the sound after 10 seconds
        setTimeout(() => {
          if (soundObject.isPlaying()) {
            soundObject.release();
          }
        }, 10000); // 10 seconds in milliseconds
      }
    });

    // You can also display the notification here if needed.
    console.log(`Received notification: 123 ${title} - ${body}`);
  };


  useEffect(() => {
    let soundObject = null;

    if (requestUserPermission()) {
      /**
       * Returns an FCM token for this device
       */

      messaging()
        .getToken()
        .then((fcmToken) => {
          console.log('FCM Token -> ', fcmToken);
          console.log('helow', userInfo)
          console.log("token body ---->", {
            "token": token,
            "push_token": fcmToken
          })
          if (fcmToken) {
            if (token) {
              fetch(`${base_url}/save-notification-token`, {
                method: 'POST',
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify({
                  "token": token,
                  "push_token": fcmToken
                }),
              }).then((response) => {
                console.log("fcmresponse------->", response)
              }).catch((error) => {
                console.log(error)
              })
            }

          }

        });
    } else console.log('Not Authorization status:', authStatus);

    messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        if (remoteMessage) {
          console.log(
            'getInitialNotification:' +
            'Notification caused app to open from quit state',
          );
          console.log(remoteMessage);
          handleNotification(remoteMessage, soundObject)
        }
      });

    messaging().onNotificationOpenedApp(async (remoteMessage) => {
      if (remoteMessage) {
        console.log(
          'onNotificationOpenedApp: ' +
          'Notification caused app to open from background state',
        );
        console.log(remoteMessage);
        if (remoteMessage.data?.unique_order_id) {
          // You can navigate to the desired screen here
          // navigation.navigate('Getsingleorder', {
          //   orderid: remoteMessage.data.unique_order_id
          // });
          handleNotification(remoteMessage, soundObject)

        }
      }
    });

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      handleNotification(remoteMessage, soundObject)



    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      // Handle the background notification here
      console.log('Received background notification', remoteMessage);
      handleNotification(remoteMessage, soundObject)
      ToastAndroid.showWithGravityAndOffset(
        remoteMessage?.data?.message,
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        50,
        50
      );
      navigation.navigate('Getsingleorder', {
        orderid: remoteMessage.data.unique_order_id
      });
      Ordered()
      setRefresh(!Refresh)
    });

    messaging()
      .subscribeToTopic(TOPIC)
      .then(() => {
        console.log(`Topic: ${TOPIC} Suscribed`);
      });

    return () => {
      unsubscribe;

    };



  }, [token]);




  const Ordered = () => {

    fetch(`${base_url}/delivery/get-delivery-orders`, {
      method: 'POST',
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        "token": token
      }),
    })
      .then((response) => (response.json()))
      .then((result) => {
        // console.log(result)
        setorderedlist(result);
        setRefresh(!Refresh)
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }
  useEffect(() => {
    Ordered()
  }, [numbers])

  // var count = Object.entries(orderedlist.new_orders)?.length;
  // console.log('count',count)

  const size = (orderedlist.new_orders != null && orderedlist.new_orders != undefined) ? (
    Object.values(orderedlist.new_orders).length
  ) : (
    <Text></Text>
  )
  console.log(size)

  const size1 = (orderedlist.accepted_orders != null && orderedlist.accepted_orders != undefined) ? (
    Object.values(orderedlist.accepted_orders).length
  ) : (
    <Text></Text>
  )
  // console.log(size)

  const size2 = (orderedlist.pickedup_orders != null && orderedlist.pickedup_orders != undefined) ? (
    Object.values(orderedlist.pickedup_orders).length
  ) : (
    <Text></Text>
  )
  useEffect(() => {
    size, size1, size2
  }, [size, size1, size2])
  // console.log(size)
  return (

    <Tab.Navigator

      screenOptions={{
        headerShadowVisible: true,
        keyboardHidesTabBar: true,
        showLabel: true,
        activeTintColor: 'orange',
        width: '90%',
        bottom: 10
      }}>
      <Tab.Screen
        name="New Orders"
        component={neworder}
        options={{
          tabBarIcon: ({ color }) => (
            <IconBadge
              MainElement={
                <View style={{
                  width: 20,
                  height: 22,
                  margin: 12,
                  top: 6
                }}><Icon name="bell" color={color} size={20} /></View>
              }
              BadgeElement={
                <Text style={{ color: '#FFFFFF', fontSize: 8 }}>{size}</Text>
              }

              IconBadgeStyle={
                {
                  width: 2,
                  height: 20,
                  top: 6,
                  backgroundColor: 'orange'
                }
              }
            />
          ),
          headerShown: false
        }}
      />
      <Tab.Screen
        name="Ordered"
        component={acceptedorder}
        options={{
          tabBarIcon: ({ color }) => (
            <IconBadge
              MainElement={
                <View style={{
                  width: 20,
                  height: 22,
                  margin: 12,
                  top: 6
                }}><Icon name="social-dropbox" color={color} size={20} /></View>
              }
              BadgeElement={
                <Text style={{ color: '#FFFFFF', fontSize: 8 }}>{size1}</Text>
              }

              IconBadgeStyle={
                {
                  width: 2,
                  height: 20,
                  top: 6,
                  backgroundColor: 'orange'
                }
              }
            />
          ),
          headerShown: false
        }}
      />
      <Tab.Screen
        name="Picked-Up"
        component={pickedup}
        options={{
          tabBarIcon: ({ color }) => (
            <IconBadge
              MainElement={
                <View style={{
                  width: 20,
                  height: 22,
                  margin: 12,
                  top: 6
                }}><Icon name="bag" color={color} size={20} /></View>
              }
              BadgeElement={
                <Text style={{ color: '#FFFFFF', fontSize: 8 }}>{size2}</Text>
              }

              IconBadgeStyle={
                {
                  width: 2,
                  height: 20,
                  top: 6,
                  backgroundColor: 'orange'
                }
              }
            />
          ),
          headerShown: false
        }}
      />

      <Tab.Screen
        name="Account"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="user" color={color} size={20} />
          ),
          headerShown: false
        }}
      />



    </Tab.Navigator>

  );
};

export default BottomNavigator;
