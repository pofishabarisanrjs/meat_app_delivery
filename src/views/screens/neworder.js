import React, { useEffect ,useState,useRef,useContext,memo} from 'react';
import {Animated, Text,View,FlatList,Image,RefreshControl, SafeAreaView, ScrollView, StyleSheet,TouchableOpacity } from 'react-native';
import ThemeManager, { useTheme } from '../../../them';
import styled from 'styled-components/native';
import { useNavigation, useIsFocused  } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { AuthContext } from '../../../AuthContext';
import TimeAgo from 'react-native-timeago';
import Location from '../components/Location';
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
  borderRadius:14px;
  margin:10px;
  height:100px`

  const Heading = styled.View`
  background-Color:${props => props.theme.backgroundAlt2};
  height:60px;
  justify-content: center;`


  const Title = styled.Text`
  font-size: 14;
  color: ${props => props.theme.text};
  padding:8px;
  width:350px;
  `

const   Notification =  (props)  => {
  const [count, setCount] = React.useState(0);
  const [refreshing, setRefreshing] = React.useState(false);
  const [orderedlist,setorderedlist] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const {userInfo,Refresh} = useContext(AuthContext);
  const [updatelist,setupdatelist] = useState([]);
  const {navigation} = props
  const isFocused = useIsFocused();  
  const LottieRef = useRef(null); 
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
  const id = userInfo.id
    const update = () => {

      console.log({
        "token" :  token,
        "user_id":id
      })
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
    
    useEffect(() => {
      isFocused ? (update()):(update())
      }, [isFocused,Refresh])

  const token = userInfo.auth_token
// console.log(token)
  const Ordered = () => {

    fetch(`${base_url}/delivery/get-delivery-orders`,{
      method:'POST',
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        "token" :  token
      }),
    })
    .then((response) =>(response.json()))
    .then((result) => {
      // console.log(result)
      setorderedlist(result.new_orders); 
    })
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
}
useEffect(()=>{
  Ordered()
},[Refresh])


const size = ( orderedlist != null &&  orderedlist != undefined) ? (
  Object.values(orderedlist).length
 ):(
   <Text></Text>
 )
// console.log(size)

  return (
    <SafeAreaView style={styles.container}>
      <Heading>
      <View style={{flexDirection:'row'}}>
            <Title style={{fontSize:24,fontWeight:'bold',width:'60%',left:10}}>New Orders </Title>
            <TouchableOpacity onPress={()=>{Ordered(),handleLikeAnimation()}}> 
          <Text style={styles. logout}>Refresh <LottieView progress={progress} style={{width:20,height:20,left:4,top:4}}

        source={require('../../assets/orderrefresh.json')}
       
        /> </Text>
      </TouchableOpacity>
      </View>
      </Heading>
        
      <Container>
        {isLoading ? 
           <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
           <Image style={{width:250,height:250}}
            source={require('../../assets/loader.gif')} >
         </Image>
         </View>:
         updatelist.status != 1 ? (
          <Text style={{padding:10,
            color:'white',
            backgroundColor:updatelist.status == 1 ? 'green':'red',
            textAlign:'center',
            width:'90%',
            alignSelf:'center',
            bottom:200
          }}>Offline</Text>
       ):(
        size == 0? (
          <View>
          <Title style={styles.noorders}>No Orders Found</Title>
         
          </View>
          
         ):(
           <FlatList
           data={orderedlist}
           removeClippedSubviews={true}
           initialNumToRender={10} 
           keyExtractor={( item , index) => item.id }
           renderItem={({ item }) =>(
             <View>
               <TouchableOpacity delayPressIn={0} onPress={()=>navigation.navigate('Getsingleorder',{
                 orderid : item.unique_order_id
               })} >
               <Card>
             <Title> <AntDesign name='clockcircleo' size={14}/>   <TimeAgo time={item.updated_at} interval={2000} /></Title>
             <View style={{flexDirection:'row',justifyContent:'space-between'}}>
             <Text style={{left:10,color:'#8360c2',fontWeight:'700'}}>{item.restaurant.name}</Text>
             <Text style={{color:'#8360c2',right:10,fontWeight:'700'}}>{item.unique_order_id}</Text>
             </View>
             <Text numberOfLines={1} style={{top:10,width:340}}> <Title> <EvilIcons name='location' size={18}/>{item.address}</Title></Text>
             </Card>
               </TouchableOpacity>
            
             </View>
            
           )}
           />
         )
       )
         
       }
         
            </Container>
              <Location/>
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
    backgroundColor:'#FEA102',
    padding:6,
    borderRadius:4,
    color:'white',
    fontWeight:'bold',
    top:6,
    paddingBottom:8
  },
  FloatingActionButtonStyle: {
    position: 'absolute',
    width: '100%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
    bottom: 0,
    backgroundColor:'green',
    borderColor:'#000000',
    // borderRadius: 200/2
  },

  FloatingActionButtonImageStyle: { 
    width: 30,
    height: 30,
    resizeMode: 'contain',
    tintColor:'#FFFFFF'
  },
  noorders:{
    backgroundColor:'red',
    textAlign:'center',
    alignSelf:'center',
    paddingBottom:20,
    paddingTop:20
  }
});
export default memo(Notification);



