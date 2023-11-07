import React, { useEffect ,useState,useRef,useContext} from 'react';
import {Animated, Text,View,FlatList,Image,RefreshControl, SafeAreaView, ScrollView, StyleSheet,TouchableOpacity } from 'react-native';
import ThemeManager, { useTheme } from '../../../them';
import styled from 'styled-components/native';
import { useNavigation, useIsFocused  } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { AuthContext } from '../../../AuthContext';
import LinearGradient from 'react-native-linear-gradient';
import TimeAgo from 'react-native-timeago';
import AntDesign from 'react-native-vector-icons/AntDesign';
import base_url from '../../constants/Constant';
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const Container = styled.View`
  flex: 1;
  background:${props => props.theme.backgroundAlt};
  justify-content: center;`
  
  const Card = styled.View`
  background-Color:${props => props.theme.backgroundAlt1};
  margin:10px;
  height:110px`

  const Heading = styled.View`
  background-Color:${props => props.theme.backgroundAlt2};
  height:60px;
  justify-content: center;`


  const Title = styled.Text`
  font-size: 14;
  color: ${props => props.theme.text};
  padding:8px;
  `

export default function  acceptedorder  (props)  {
  const [count, setCount] = React.useState(0);
  const [refreshing, setRefreshing] = React.useState(false);
  const [orderedlist,setorderedlist] = useState([]);
  const [userlist,setuserlist] = useState([]);
  const [ongoing,setongoing] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const LottieRef = useRef(null); 
  const {userInfo} = useContext(AuthContext);
  const {navigation} =props;
  const isFocused = useIsFocused();
  const theme = useTheme()
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setCount(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  const progress = useRef(new Animated.Value(0)).current;
  const [hasLiked, setHasLiked] = useState(false);
 

  const handleLikeAnimation = () => {
    const newValue = hasLiked ? 1 : 0;

    Animated.timing(progress, {
      toValue: newValue,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    setHasLiked(!hasLiked);
  };

  useEffect(() => {
    isFocused ? (Ordered()):(Ordered())
    }, [isFocused])

  const token = userInfo.auth_token
  const Ordered = () => {

    fetch(`${base_url}/delivery/update-user-info`,{
      method:'POST',
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        "token" : token
      }),
    })
    .then((response) =>(response.json()))
    .then((result) => {
      // console.log(result)
      setorderedlist(result.accepted_orders); 
    })
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
}
useEffect(()=>{
  Ordered()
},[])
// console.log(token)
const updateuser = () => {

  fetch(`${base_url}/delivery/update-user-info`,{
    method:'POST',
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      "token" : token
    }),
  })
  .then((response) =>(response.json()))
  .then((result) => {
    // console.log(result)
    setuserlist(result.data); 
    // var i =0
    // for (i=0; i<userlist?.orders?.length;i++)
    // setongoing(result.data.orders[i])
    // console.log(result.data.orders[i])
  })
  .catch((error) => console.error(error))
  .finally(() => setLoading(false));
}
useEffect(()=>{
updateuser()
},[])

const getTime = () =>{
  var i= 0 
  const views = [];

  // let count = 0;

 //  console.log('hello',item.orderitems.length)
  for (i=0; i<userlist?.orders?.length;i++){
    
    // console.log('hell',i)
    views.push(
    //  <View style={{flexDirection:'row',left:16,}}>
    //    <View style={{borderBottomWidth:1,borderBottomColor:'red', borderStyle: 'dashed',}}>
    //      {/* <Text>{userlist.orders[i].is_complete}</Text> */}
    // {/* <Title1 style={{fontWeight:'bold'}}>{itemdata.orderitems[i].quantity}<Entypo name={'cross'} size={10}></Entypo></Title1> */}
    // </View>
    //    <View style={{borderBottomWidth:1,borderBottomColor:'red',width:'80%', borderStyle: 'dashed',}}>
    //    {/* <Title1 style={{fontWeight:'bold'}}>         {itemdata.orderitems[i].name}</Title1> */}
    //    </View>
      //  {userlist.orders[i].is_complete == 0 ? (
      //    <Text></Text>
      //  ):(<Text>{userlist.orders[i].order.address}</Text>)}
         
      
     
    //   </View>
    userlist.orders[i].is_complete == 0 ? (
      <Text style={{height:0}}></Text>
    ):(
    // <Text>{userlist.orders[i].order.address}</Text>
    <Card>
    <View style={{flexDirection:'row',justifyContent:'space-between'}}> 
  <Title style={{fontWeight:'bold'}}>#{userlist.orders[i].order.unique_order_id}</Title>
  <View style={{width:140,alignItems:'flex-end'}}>
  <Title style={{fontWeight:'bold'}}><TimeAgo time={userlist.orders[i].updated_at} interval={2000} /></Title>
  </View>
 
  </View>
  <View style={{flexDirection:'row',justifyContent:'space-between'}}>
  <LinearGradient
  start={{x: 0.0, y: 0.45}} end={{x: 0.0, y: 1.45}}
  // locations={[0,0.5,0.6]}
  colors={['#FF3434', '#FF3434', '#FF3434']}
  style={styles.linearGradient}>
    
    {
      userlist.orders[i].is_complete != 0 ?
      <Text style={styles.buttonText}>
      Completed
    </Text>
    :
    <Text style={styles.buttonText}>
    On-going
  </Text>
    }
  </LinearGradient>
  <View style={styles.method}>
   <AntDesign name='checkcircleo' size={13} color='white'/>
   <Text style={{fontWeight:'700',color:'white'}}>  {userlist.orders[i].order.payment_mode}</Text>
   </View>
  {/* <Text style={{color:'white',right:10,fontWeight:'700',padding:5,
backgroundColor:'#18c775',
borderRadius:5}}><AntDesign name='checkcircleo' size={13}/> {userlist.orders[i].order.payment_mode}</Text> */}
  </View>
  <Text numberOfLines={1} style={{top:10,width:340}}><Title> <EvilIcons name='location' size={18}/>{userlist.orders[i].order.address}</Title></Text>
  </Card>)
    )
  }
  return views
  // return console.log(i)
}   

  return (
    <SafeAreaView style={styles.container}>
        
      <Container>
        {isLoading ? 
          ( <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
           <Image style={{width:250,height:250}}
            source={require('../../assets/loader.gif')} >
         </Image>
         </View>):
        // <FlatList
        //     data={orderedlist}
        //     keyExtractor={( item , index) => item.id }
        //     renderItem={({ item }) =>(
        //       <View>
            //   <Card>
            //     <View style={{flexDirection:'row',justifyContent:'space-between'}}> 
            //   <Title style={{fontWeight:'bold'}}>#{item.unique_order_id}</Title>
            //   <Title style={{fontWeight:'bold',right:140}}>#{item.updated_at}</Title>
            //   </View>
            //   <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            //   <LinearGradient
            //   start={{x: 0.0, y: 0.45}} end={{x: 0.0, y: 1.45}}
            //   // locations={[0,0.5,0.6]}
            //   colors={['#ff9801', '#f44336', '#f44336']}
            //   style={styles.linearGradient}>
                
            //   <Text style={styles.buttonText}>
            //     On-going
            //   </Text>
            //   </LinearGradient>
            //   <Text style={{color:'white',right:10,fontWeight:'700',padding:5,
            // backgroundColor:'#18c775',
            // borderRadius:5}}><AntDesign name='checkcircleo' size={13}/>  payment mode</Text>
            //   </View>
            //   <Text numberOfLines={1} style={{top:10,width:340}}><Title> <EvilIcons name='location' size={18}/>{item.address}</Title></Text>
            //   </Card>
        //       </View>
             
        //     )}
        //     />
      
        (getTime())
            }
            </Container>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
 flex:1
  },
  scrollView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  head:{
    height:60,
    backgroundColor:'white',
    alignItems:'center',
    flexDirection:'row',
  },
  logout:{
    left:52,
    fontSize:14,
    backgroundColor:'#8360c2',
    padding:6,
    borderRadius:4,
    color:'white',
    fontWeight:'bold',
    top:6,
    paddingBottom:8
  },
  linearGradient: {
    borderRadius: 5,
    left:10,
    padding:5,
    paddingRight:10
  },
  buttonText: {
    fontSize: 12,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    // margin: 12,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  method:{
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'#18c775',
    width:140,
    padding:4,
    borderRadius:4,
    right:5
  }
});




