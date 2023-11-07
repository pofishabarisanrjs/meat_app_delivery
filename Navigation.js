import 'react-native-gesture-handler';
import React, {useContext} from 'react';
import {Settings, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BottomNavigator from './src/views/navigation/BottomNavigator';
import AccountScreen from './src/views/screens/AccountScreen';
import neworder from './src/views/screens/neworder';
import acceptedorder from './src/views/screens/acceptedorder';
import pickedup from './src/views/screens/pickedup';
import Getsingleorder from './src/views/screens/Getsingleorder';
import {AuthContext} from './AuthContext';

const Stack = createStackNavigator();

const App = () => {
  const {userInfo, splashLoading} = useContext(AuthContext);
  return (
   
  
    <NavigationContainer>
      <StatusBar backgroundColor='white' barStyle="dark-content" />
      
      <Stack.Navigator screenOptions={{headerShown: false}}>   
     
      { userInfo.auth_token ? (
          <Stack.Screen name="Home" component={BottomNavigator} />
          
        ) : (
          <>
            <Stack.Screen
              name="Register"
              component={AccountScreen}
              options={{headerShown: false}}
            />
          </>

        )}    
      <Stack.Screen name="neworder" component={neworder} />
      <Stack.Screen name="acceptedorder" component={acceptedorder} />
      <Stack.Screen name="pickedup" component={pickedup} />
      <Stack.Screen name="Getsingleorder" component={Getsingleorder} />
    
       
      </Stack.Navigator> 
      
    </NavigationContainer>
    
  );
};

export default App;

 