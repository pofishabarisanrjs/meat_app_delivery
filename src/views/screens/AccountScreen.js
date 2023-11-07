import React, {useContext, useState} from 'react';
import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  View,
  StyleSheet,
  Image,KeyboardAvoidingView, ScrollView, 
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../../../AuthContext';
import LottieView from 'lottie-react-native';


const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const {isLoading, login} = useContext(AuthContext);
  const [errormsg, seterrormsg] = useState('');
  const [erroremailmsg, seterroremailmsg] = useState('');
  const [errorpassmsg, seterrorpassmsg] = useState('');
  const [errorpassmatchmsg, seterrormatchpassmsg] = useState('');

  const emailmatch = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
  const passwordmatch = /^.*(?=.{8,})/

  const submit = () => {
    if (email == null )
    return seterroremailmsg ('Enter your valid Email ')
    else if (!emailmatch.test(email))
    return seterroremailmsg ('Enter your valid Email ')
    if (password == null)
    return seterrormatchpassmsg('Password must contain atleat 8 characters')
    else if (!passwordmatch.test(password))
    return seterrormatchpassmsg('Password must contain atleat 8 characters')
    else
    return login(email, password)
    }


  return (
    isLoading ? 
      <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'white'}}>
      <Image style={{width:250,height:250}}
       source={require('../../assets/loader.gif')} >
    </Image>
    </View>
    :
    <ScrollView style={{flex:1,backgroundColor:'#161b31'}}>
    {/* <View style={styles.container}>
      <Spinner visible={isLoading} />
      <View style={styles.head}>
      <View style={{width:'50%'}}>
          <Image
            style={{ width: '64%', height: 124,justifyContent:"center",left:28}}
             source={require('../../assets/delog.png')}></Image>
          </View>
          <View style={{top:20,justifyContent:"center",alignItems:'center',right:20}}>
        
              <Text style={styles.login}>LOGIN</Text>
              <Text style={styles.log}>Enter your email and password</Text>
          
          
       </View>
      </View>
     
      <View style={styles.wrapper}>
      <KeyboardAvoidingView>
        <TextInput
          style={styles.input}
          value={email}
          placeholder="Enter email"
          onChangeText={text => setEmail(text)}
        />
        <View style={{bottom:22}}>
        <Text > {!emailmatch.test(email) ? (<Text style={{color:'red',textAlign:'center',left:10,bottom:10}}>{erroremailmsg}</Text>):(<Text style={{height:0}}></Text>) }</Text>
        </View>
          
        <TextInput
          style={styles.input}
          value={password}
          placeholder="Enter password"
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />
        <View style={{bottom:22}}>
        <Text>{ passwordmatch.test(password)? (<Text></Text>):( <Text style={{color:'red',textAlign:'center',left:10,bottom:10}}>{errorpassmatchmsg}</Text>) }</Text>
        </View>
        </KeyboardAvoidingView>
            <TouchableOpacity title="Login"
          onPress={() => 
            submit()
          }><Text style={styles.button}>Login</Text></TouchableOpacity>
 
      </View>
      
    </View> */}
    <View style={{width:'100%',height:300}}>
    <LottieView  
        source={require('../../assets/introboy.json')}
        colorFilters={[
          {
            keypath: 'button',
            color: '#F00000',
          },
          {
            keypath: 'Sending Loader',
            color: '#F00000',
          },
        ]}
        autoPlay
        
        // onPress={autoPlay}
        /> 
    <View>
     
    </View>
    </View>
    <View style={{width:'86%',height:200,left:28,top:60}}>
    <KeyboardAvoidingView>
        <TextInput
          style={styles.input}
          value={email}
          placeholder="Enter email"
          onChangeText={text => setEmail(text)}
        />
        <View style={{bottom:22}}>
        <Text > {!emailmatch.test(email) ? (<Text style={{color:'red',textAlign:'center',left:10,bottom:10}}>{erroremailmsg}</Text>):(<Text style={{height:0}}></Text>) }</Text>
        </View>
          
        <TextInput
          style={styles.input}
          value={password}
          placeholder="Enter password"
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />
        <View style={{bottom:22}}>
        <Text>{ passwordmatch.test(password)? (<Text></Text>):( <Text style={{color:'red',textAlign:'center',left:10,bottom:10}}>{errorpassmatchmsg}</Text>) }</Text>
        </View>
        </KeyboardAvoidingView>
    </View>
    <View style={{height:150,top:30}}>
    <TouchableOpacity title="Login"
          onPress={() => 
            submit()
          }><Text style={styles.button}>Login</Text></TouchableOpacity>
    </View>
    
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',  
    backgroundColor:'#161b31'
  },
  wrapper: {
    width: '80%',
    top:50,
  },
  input: {
    width:'100%',
    backgroundColor:'#f2f4f9',
    borderRadius:6,
    marginBottom:30,
    height:56,
    paddingLeft:30
  },
  link: {
    color: 'orange',
    
  },
  button:{
    backgroundColor:'#18c775',
        color:'white',
        height:44,
        textAlign:'center',
        borderRadius:5,
        paddingTop:12,
        fontWeight:'bold',
        fontSize:16,
        width:'86%',left:28,top:30,
  },
  head:{
    backgroundColor:'#161b31',
    width:'100%',
    height:250,
    justifyContent:'center',
    alignItems:'center'
    },
backbutn:{
  backgroundColor:'#f2f4f9',
  width:'100%',
  top:10
    },
    login:{
     
        fontWeight:'bold',
        fontSize:20,
        color:'white',
        left:16,
        fontFamily: "Segoe UI",
    },
    log:{
        color:'white',
        left:16
    },
    content:{
        width:'100%',
        height:400,
        alignItems:'center'
    },
});

export default LoginScreen;

