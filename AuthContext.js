import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';

import base_url from './src/constants/Constant';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);
  const [numbers, updateNumber] = useState(true);
  const [Refresh, setRefresh] = useState(true);



  const login = (email, password) => {
    setIsLoading(true);

    axios
      .post(`${base_url}/delivery/login?email=${email}&password=${password}`, {
        email,
        password,
      })
      .then(res => {
        let userInfo = res.data;
       // console.log(userInfo);
        setUserInfo(userInfo.data);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
        if(userInfo.data == 'Record doesnt exists...')
        return alert ('Email and Password mismatch')
      })
      .catch(e => {
        console.log(`login error ${e}`);
        setIsLoading(false);
      });
  };

  const logout = () => {
    setIsLoading(true);

    axios
      .post(
        `${base_url}/login?`,
        {},
        {
          headers: {Authorization: `Bearer ${userInfo.auth_token}`},
        },
      )
      .then(res => {
        console.log(res.data);
        AsyncStorage.removeItem('userInfo');
        setUserInfo({});
        setIsLoading(false);
      })
      .catch(e => {
        console.log(`logout error ${e}`);
        setIsLoading(false);
      });
  };

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);

      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);

      if (userInfo.data) {
        setUserInfo(userInfo.data);
      }

      setSplashLoading(false);
    } catch (e) {
      setSplashLoading(false);
      console.log(`is logged in error ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        splashLoading,
        login,
        logout,
        numbers, 
        updateNumber,
        Refresh, 
        setRefresh
      }}>
      {children}
    </AuthContext.Provider>
  );
};
