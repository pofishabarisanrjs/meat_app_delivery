// import React, { useState, useEffect, useContext, useRef } from 'react';
// import { Text, View, PermissionsAndroid } from 'react-native';
// import { AuthContext } from '../../../AuthContext';
// import Geolocation from 'react-native-geolocation-service';

// const HelloWorld = () => {
//   const [enabled, setEnabled] = useState(false);
//   const [location, setLocation] = useState('');
//   const [loc, setLoc] = useState([]);
//   const [isLoading, setLoading] = useState(true);
//   const [latitude, setLatitude] = useState(null);
//   const [longitude, setLongitude] = useState(null);
//   const [intervalId, setIntervalId] = useState(null); // Added interval ID state
//   const { userInfo } = useContext(AuthContext);
//   const [coord, setCoord] = useState(null);

//   const prevLocation = useRef({ latitude: null, longitude: null });

//   const token = userInfo.auth_token;
//   const id = userInfo.id;

//   useEffect(() => {
//     requestLocationPermission();
//   }, []);

//   const requestLocationPermission = async () => {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//         {
//           title: 'Location Permission',
//           message: 'This app needs access to your location to get the current latitude and longitude.',
//           buttonPositive: 'OK',
//         }
//       );

//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//         // Permission granted, start fetching the location every 10 seconds (10000 milliseconds)
//         const locationInterval = setInterval(getLocation, 10000);
//         setIntervalId(locationInterval); // Store the interval ID

//         return () => clearInterval(locationInterval);
//       } else {
//         console.warn('Location permission denied');
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const getLocation = () => {
//     Geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         setLatitude(latitude);
//         setLongitude(longitude);
//         setCoord(position.coords);
//       },
//       (error) => {
//         console.error(error);
//       },
//       {
//         enableHighAccuracy: true,
//         maximumAge: 10000,
//       }
//     );
//   };

//   const Ordered = () => {
//     console.log("sabaris latitude longitude call", latitude, longitude, new Date());

//     fetch(`https://hyfifood.com/public/api/delivery/set-delivery-guy-gps-location`, {
//       method: 'POST',
//       headers: {
//         "content-type": "application/json",
//       },
//       body: JSON.stringify({
//         "token": token,
//         "user_id": id,
//         "delivery_lat": latitude,
//         "delivery_long": longitude,
//         "heading": ""
//       }),
//     })
//       .then((response) => (response.json()))
//       .then((result) => {
//         console.log(result);
//         setLoc(result);
//       })
//       .catch((error) => console.error(error));
//   };

//   useEffect(() => {
//     if (latitude !== prevLocation.current.latitude || longitude !== prevLocation.current.longitude) {
//       // Call Ordered function when latitude or longitude changes
//       Ordered();
//       prevLocation.current.latitude = latitude;
//       prevLocation.current.longitude = longitude;
//     }
//   }, [latitude, longitude]);

//   return (
//     location == null ? <Text>hello</Text> :
//       <View style={{ flexDirection: 'row', justifyContent: 'flex-end', height: 0 }}>
//         {/* Your UI components */}
//       </View>
//   );
// };

// export default HelloWorld;

import React, { useState, useEffect, useContext } from 'react';
import { View, Text, PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { AuthContext } from '../../../AuthContext';
import base_url from '../../constants/Constant';

const LocationComponent = () => {
  const [location, setLocation] = useState(null);
  const { userInfo } = useContext(AuthContext);
  const token = userInfo.auth_token;
  const id = userInfo.id;

  useEffect(() => {
    // Check and request location permissions
    checkLocationPermission();
  }, []);

  const checkLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location.',
          buttonPositive: 'OK',
        }
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // Permission granted, start getting location updates
        startLocationUpdates();
      } else {
        console.warn('Location permission denied');
        // Handle the case where the user denied permission
      }
    } catch (error) {
      console.error('Error checking location permission:', error);
    }
  };

  const startLocationUpdates = () => {
    // Start getting location updates every 10 seconds
    const locationInterval = setInterval(() => {
      getLocation();
    }, 10000);

    // Clear the interval when the component unmounts
    return () => {
      clearInterval(locationInterval);
    };
  };

  const getLocation = () => {
    // Start tracking the location updates.
    Geolocation.getCurrentPosition(
      (position) => {
      //  console.log(position, new Date());
        // Handle the new location data here.
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });

        fetch(`${base_url}/delivery/set-delivery-guy-gps-location`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            token: token,
            user_id: id,
            delivery_lat: position.coords.latitude,
            delivery_long: position.coords.longitude,
            heading: '',
          }),
        })
          .then((response) => response.json())
          .then((result) => {
          //  console.log(result);
          })
          .catch((error) => console.error(error));
      },
      (error) => {
        console.error('Error getting location:', error);
      },
      {
        enableHighAccuracy: true, // Use GPS if available
        timeout: 20000, // Maximum time to wait for location updates
        maximumAge: 0, // No maximum age for cached location
      }
    );
  };

  return (
    <View>
      {/* Your component's JSX */}
    </View>
  );
};

export default LocationComponent;
