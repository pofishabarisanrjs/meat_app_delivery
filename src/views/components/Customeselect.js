import React, { useState, useEffect, useContext } from 'react';

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import LinearGradient from 'react-native-linear-gradient'

import AntDesign from 'react-native-vector-icons/AntDesign';

import Ionicons from 'react-native-vector-icons/Ionicons';

import FontAwesome from 'react-native-vector-icons/FontAwesome'

import { AuthContext } from '../../../AuthContext';
import base_url from '../../constants/Constant';
export default function Customeselect({

  selectionMode,

  option1,

  option2,

  option3,

  option4,

  onSelectSwitch,

}) {

  const [getSelectionMode, setSelectionMode] = useState(selectionMode);

  const { userInfo } = useContext(AuthContext);

  const [userlist, setuserlist] = useState([]);

  const [isLoading, setLoading] = useState(true);

  const updateSwitchData = value => {

    setSelectionMode(value);

    onSelectSwitch(value);

  };

  const token = userInfo.auth_token

  const updateuser = () => {




    fetch(`${base_url}/delivery/update-user-info`, {

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

        setuserlist(result.data);

      })

      .catch((error) => console.error(error))

      .finally(() => setLoading(false));

  }

  useEffect(() => {

    updateuser()

  }, [userlist])




  const ratings = () => {

    var i = 0;

    for (i = 0; i < userlist?.ratings?.length; i++)

      // console.log(userlist.ratings.length)

      return (

        <Text>{userlist?.ratings[i]?.rating_delivery}</Text>

      )

  }




  return (

    <View

      style={{

        height: 200,

        width: '50%',

        borderColor: '#AD40AF',

        flexWrap: "wrap",

      }}>



      {/* on-Going */}




      <LinearGradient

        start={{ x: 0.0, y: 0.45 }} end={{ x: 0.0, y: 1.45 }}

        colors={['#FF3434', '#FF3434', '#FF3434']}

        style={styles.linearGradient}

      >

        <TouchableOpacity

          activeOpacity={1}

          onPress={() => updateSwitchData(1)}

          style={{

            width: '90%',

            // justifyContent: 'center',

            alignItems: 'center',

            margin: 2,

            height: 77

          }}>

          <Text style={{ top: 12, right: 40, fontSize: 18, fontWeight: 'bold', color: 'white' }}>{userlist?.onGoingCount}</Text>

          <Text

            style={{

              color: 'black',

              fontSize: 14,

              fontFamily: 'Roboto-Medium',

              color: 'white',

              fontWeight: 'bold'

            }}>

            {option1}      <Ionicons name='play-forward-outline' size={30} color='white' />

          </Text>




        </TouchableOpacity>




        {/* cod*/}




      </LinearGradient>

      <LinearGradient

        colors={['#FFAD24', '#FFAD24']}

        style={styles.linearGradient}

      >

        <TouchableOpacity

          activeOpacity={1}

          // onPress={() => updateSwitchData(2)}

          style={{

            width: '90%',

            justifyContent: 'center',

            alignItems: 'center',

            margin: 2,

            height: 80,



          }}>

          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}><FontAwesome name='rupee' size={16} /> {userlist.deliveryCollection}</Text>

          <Text

            style={{

              color: 'black',

              fontSize: 18,

              fontFamily: 'Roboto-Medium',

              color: 'white',

              fontWeight: 'bold'

            }}>

            {option3}

          </Text>

        </TouchableOpacity>

      </LinearGradient>




      {/* completed  */}






      <TouchableOpacity

        activeOpacity={1}

        onPress={() => updateSwitchData(3)}

        style={{

          width: '93%',

          // justifyContent: 'center',

          alignItems: 'center',

          margin: 2,

          height: 80, backgroundColor: '#27FF93'

        }}>

        <Text style={{ top: 16, right: 40, fontSize: 18, fontWeight: 'bold', color: 'white' }}>{userlist?.completedCount}</Text>

        <Text

          style={{

            color: 'black',

            fontSize: 14,

            fontFamily: 'Roboto-Medium',

            color: 'white',

            fontWeight: 'bold', top: 5

          }}>

          {option2}       <AntDesign name='checkcircleo' size={30} />

        </Text>

      </TouchableOpacity>






      {/* reviews */}




      <TouchableOpacity

        activeOpacity={1}

        // onPress={() => updateSwitchData(3)}

        style={{

          width: '93%',

          justifyContent: 'center',

          alignItems: 'center',

          margin: 2,

          height: 84, backgroundColor: '#317DFF'

        }}>

        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}><FontAwesome name='star' size={16} /> {ratings()}.0</Text>

        <Text

          style={{

            color: 'black',

            fontSize: 14,

            fontFamily: 'Roboto-Medium',

            color: 'white',

            fontWeight: 'bold'

          }}>

          {option4}

        </Text>

      </TouchableOpacity>



    </View>

  );

}










const styles = StyleSheet.create({




  linearGradient: {

    width: '93%',

    backgroundColor: 'pink',

    alignItems: 'center',

    justifyContent: 'center',

    margin: 2,

    marginLeft: 10

  },

});