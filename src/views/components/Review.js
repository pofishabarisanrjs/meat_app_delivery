import React, {useState,useEffect} from 'react';
import {Image,StyleSheet,Text,View,TouchableOpacity,ScrollView,Button} from 'react-native';



const HomeScreen = (props) => {

  return (

     <ScrollView >     
    
        <Text>hai</Text>
    </ScrollView>
   
  
 
    
     
   
  );
};

const style = StyleSheet.create({
  header: {

    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor:'white',
    height:80
    
  },
  logo:{

        width:'35%',
        height:32,
        top:24
    },
    location:{
        color:'black',
        alignSelf:'flex-end',
        width:120,
        height:20,
        position:"relative",
        flexDirection:"row",
        alignItems:"center",
        marginRight:4,
        bottom:30
    },
    locationicon:{
      width:10,
      height:13,
      right:8,
      justifyContent:"center",
      alignItems:'center',
      
    },
    licon:{
      width: 4,
      height:8,
      right:8,
      top:2,
    },
    View:{
       width:'100%',
       height:30,
       flexDirection:'row',
       top:68,
       zIndex:6,
       alignItems:'center',

    },
    imagestyle: {
      height: 20,
      width: 20,
     left:340,
     top:62,
     backgroundColor:'white',
     
    },
  });

export default HomeScreen;

