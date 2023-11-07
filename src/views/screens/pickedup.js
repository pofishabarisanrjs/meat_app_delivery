import React, { useEffect ,useState,useRef,useContext, memo,useMemo, useCallback} from 'react';
import {AppState,Animated, Text,View,Image,FlatList,RefreshControl, SafeAreaView, ScrollView, StyleSheet,TouchableOpacity } from 'react-native';
import ThemeManager, { useTheme } from '../../../them';
import styled from 'styled-components/native';
import { useNavigation, useIsFocused  } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { AuthContext } from '../../../AuthContext';
import Location from '../components/Location';
import TimeAgo from 'react-native-timeago';
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
  width:350px;`

const  Notification = (props) => {
  const [count, setCount] = React.useState(0);
  const [refreshing, setRefreshing] = React.useState(false);
  const [orderedlist,setorderedlist] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const {userInfo} = useContext(AuthContext);
  const {navigation} = props
  const isFocused = useIsFocused();
  const LottieRef = useRef(null); 
  const theme = useTheme()
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setCount(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);
  useEffect(() => {
    isFocused ? (Ordered()):(Ordered())
    }, [isFocused])


    
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

  const token = userInfo.auth_token
  // console.log(token)
  const Ordered = async () => {

   await fetch(`${base_url}/delivery/get-delivery-orders`,{
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
      setorderedlist(result.pickedup_orders); 
    })
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
}
useEffect(()=>{
  Ordered()
},[])

// useEffect(() => {
//   const subscription = AppState.addEvenListener('change', ()=>{})
//   return () => {
//     subscription.remove()
//   }
//  }, [])

  const RenderItem = useCallback(({item}) => {
    // console.log(item)
    
 return (
      <View>
      <TouchableOpacity onPress={()=>navigation.navigate('Getsingleorder',{
        orderid : item.unique_order_id
      })} >
    <Card>
    <Title><AntDesign name='clockcircleo' size={14}/>  <TimeAgo time={item.updated_at} interval={2000} /></Title>
    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
    <Text style={{left:10,color:'#8360c2',fontWeight:'700'}}>{item.restaurant.name}</Text>
    <Text style={{color:'#8360c2',right:10,fontWeight:'700'}}>{item.unique_order_id}</Text>
    </View>
    <Text numberOfLines={1} style={{top:10,width:340}}> <Title> <EvilIcons name='location' size={18}/>{item?.address}</Title></Text>
    </Card>
    </TouchableOpacity>
    </View>
   
 )
  }, [orderedlist]);

// const gettime = () =>{
//   var hours = new Date().getHours(); 
//   var min = new Date().getMinutes(); 
//   var sec = new Date().getSeconds();
//   console.log(hours,min,sec)
// }

const size2 = ( orderedlist != null &&  orderedlist != undefined) ? (
  Object.values(orderedlist).length
 ):(
   <Text></Text>
 )

  return (
    <SafeAreaView style={styles.container}>
      <Heading>
      <View style={{flexDirection:'row'}}>
            <Title style={{fontSize:24,fontWeight:'bold',width:'60%',left:10}}>Picked-Up Orders </Title>
            <TouchableOpacity onPress={()=>{Ordered(),handleLikeAnimation() }}> 
          <Text style={styles.logout}>Refresh
          <LottieView  style={{width:20,height:20,left:4,top:4}}
          ref={LottieRef}
        source={require('../../assets/orderrefresh.json')}
        progress={progress}
        
        // onPress={autoPlay}
        /> </Text>
         
      </TouchableOpacity>
      </View>
      </Heading>
        
      <Container>
      {isLoading ? 
       <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
       <Image style={{width:250,height:250}}
        source={require('../../assets/loader.gif')} />
          </View>:
           size2 == 0? (
            <View>
            <Title style={styles.noorders}>No Orders Found</Title>
            </View>
            
           ):(
        <FlatList
            data={orderedlist}
            initialNumToRender={5}
            removeClippedSubviews={true}
            onEndThreshold={0}
            // ref={ref => { orderedlist = ref }}
            keyExtractor={(item)  => item.id }
            renderItem={({ item }) =><RenderItem item={(item)} />
            
            }
            />)}
           
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
  noorders:{
    backgroundColor:'red',
    textAlign:'center',
    alignSelf:'center',
    paddingBottom:20,
    paddingTop:20
  }
});

export default memo(Notification);


