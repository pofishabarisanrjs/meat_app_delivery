import React, { useEffect ,useState,useRef,useContext} from 'react';
import {Animated, Text,View,FlatList,Image,RefreshControl, SafeAreaView, ScrollView, StyleSheet,TouchableOpacity } from 'react-native';
import ThemeManager, { useTheme } from '../../../them';
import styled from 'styled-components/native';
import { useNavigation, useIsFocused  } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { AuthContext } from '../../../AuthContext';
import AntDesign from 'react-native-vector-icons/AntDesign'
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

export default function  acceptedorder  (props)  {
  const [count, setCount] = React.useState(0);
  const [refreshing, setRefreshing] = React.useState(false);
  const [orderedlist,setorderedlist] = useState([]);
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

     fetch(`${base_url}/delivery/get-delivery-orders`,{
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

const size1 = ( orderedlist != null &&  orderedlist != undefined) ? (
  Object.values(orderedlist).length
 ):(
   <Text></Text>
 )

  return (
    <SafeAreaView style={styles.container}>
      <Heading>
      <View style={{flexDirection:'row'}}>
            <Title style={{fontSize:24,fontWeight:'bold',width:'60%',left:10}}>Accepted Orders </Title>
            <TouchableOpacity onPress={()=>{Ordered(),  handleLikeAnimation() }}> 
          <Text style={styles. logout}>Refresh <LottieView  style={{width:20,height:20,left:4,top:4}}

        source={require('../../assets/orderrefresh.json')}
        progress={progress}
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
          size1 == 0? (
            <View>
            <Title style={styles.noorders}>No Orders Found</Title>
            </View>
            
           ):(
        <FlatList
            data={orderedlist}
            keyExtractor={( item , index) => item.id }
            renderItem={({ item }) =>(
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
              <Text numberOfLines={1} style={{top:10,width:340}}> <Title> <EvilIcons name='location' size={18}/>{item.address}</Title></Text>
              </Card>
              </TouchableOpacity>
              </View>
             
            )}
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




