import React, {useContext,useState,useEffect} from 'react';
import { Dimensions, ActivityIndicator,Switch, View,Text,TouchableOpacity,StyleSheet } from "react-native";
import Chart from '../components/Chart';
import { ScrollView } from 'react-native-gesture-handler';
import {AuthContext} from '../../../AuthContext';
import Custombutton from '../components/Custombutton'
import Spinner from 'react-native-loading-spinner-overlay';
import ThemeManager, { useTheme } from '../../../them';
import styled from 'styled-components/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import base_url from '../../constants/Constant';

const Container = styled.View`
  flex: 1;
  background:${props => props.theme.backgroundAlt};
  align-items: center;
  justify-content: center;`
 
const Title = styled.Text`
  font-size: 24;
  color: ${props => props.theme.text};
  // fontSize:14;
  // background:'red';
  padding:8px;
  borderRadius:4;`

  const Heading = styled.View`
  background:${props => props.theme.backgroundAlt2};
  height:60px;
  justify-content: center;`
   

export default function ProfileScreen() {
  const {userInfo, isLoading, logout} = useContext(AuthContext);
  const [orderedlist,setorderedlist] = useState([]);
  const [updatelist,setupdatelist] = useState([]);
  const [Loading,setLoading] = useState(true);
  // const [isloading,setisLoading] = useState(true);
  const token = userInfo.auth_token
  const id = userInfo.id
  console.log(token)
  const Ordered = () => {

    fetch(`${base_url}/delivery/toggle-delivery-guy-status`,{
      method:'POST',
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        "token" :  token,
        "toggle_status":true,
        "force_offline":false
      }),
    })
    .then((response) =>(response.json()))
    .then((result) => {
      console.log(result)
      setorderedlist(result),update()
    })
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
}

const update = () => {

  fetch(`${base_url}/delivery/update-user-info`,{
    method:'POST',
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      "token" :  token,
      "user_id":id
    }),
  })
  .then((response) =>(response.json()))
  .then((result) => {
    // console.log(result)
    setupdatelist(result.data); 
  })
  .catch((error) => console.error(error))
  .finally(() => setLoading(false));
}

useEffect(()=>{
update()
},[])


  const theme = useTheme()
        return (
            <ScrollView>
              <Spinner visible={isLoading} />
            <View>
            <Heading>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
             <Title style={{fontSize:24,fontWeight:'bold',left:1}}>Welcome {userInfo.name} </Title>
            <TouchableOpacity onPress={logout} style={styles.logout}> 
          <Text style={{fontWeight:'500'}}> Logout Delivery  </Text>
          <MaterialIcons name='logout' color='white' size={18}/> 
      </TouchableOpacity>
      {/* <MaterialIcons name='logout' color='white' size={18}/> */}
      </View>
      </Heading>
      <Container>
         <Switch
          value={theme.mode === 'dark'}
          onValueChange={value => theme.setMode(value ? 'dark' : 'light')}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={theme.mode === 'dark' ? "#f5dd4b" : "#f4f3f4"}
        />
        <Text style={theme.mode === 'dark' ?{color:'white'}:{color:"#000"}} >Toggle between dark and light mode</Text>
        <View>
          {Loading ?<Text style={{top:10}}> <ActivityIndicator size="small" color="#0000ff" /></Text>:
          <TouchableOpacity style={{
            backgroundColor: updatelist.status == 1 ? 'green':'red',
            top:10,
            borderRadius:6
            }} delayPressIn={0}
             onPressIn={()=>{Ordered(),setLoading(false)}}>
               
          {updatelist.status == 1 ? (
             <Text style={{padding:10,color:'white'}}>Online</Text>
          ):(
            <Text style={{padding:10,color:'white'}}>Offline</Text>
          )} 
        
          </TouchableOpacity>
}
        </View>
        
      <Title style={{fontSize:14,fontWeight:'bold',top:10}}>Last 4 Days Earnings</Title>
          <Chart/>
          <Custombutton/>
           </Container>
          </View>
         
         
          </ScrollView>
        )
    }

const styles = StyleSheet.create({

    status: {
      backgroundColor: 'red',
      alignItems: 'center',
      justifyContent: 'center',
      padding:15,
      width:'30%',
      left:140,
      top:30,
      borderRadius:50
    },
    barstatus: {
       width:'50%',
       top:50,
       left:20,
       fontSize:12,
       fontWeight:'bold',
       color:'black'
     },
     head:{
       width:'100%',
       height:60,
       backgroundColor:'white',
       alignItems:'center',
       flexDirection:'row',
       
     },
     logout:{
       backgroundColor:'#FEA102',
       borderRadius:4,
       top:6,
       right:10,
      height:35,
      justifyContent:'center',
       alignItems:'center',
       flexDirection:'row',
       paddingRight:4
     }
  });