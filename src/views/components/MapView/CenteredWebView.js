import React from 'react';
import { View, Modal, StyleSheet, TouchableOpacity, Text,Linking } from 'react-native';
import {WebView} from 'react-native-webview'
import Ionicons from 'react-native-vector-icons/Ionicons';

const CenteredWebView = ({ url, onClose }) => {
  console.log(url)

  const outSideMap=()=>{
    Linking.openURL(url)
      .then(() => {
        console.log('URL opened successfully');
      })
      .catch((err) => {
        console.error('An error occurred: ', err);
      });
  }
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={true} // You can toggle the visibility of this modal as needed
    >
      <View style={{
      marginTop:20,
      flex:1,
      justifyContent:'center',
      backgroundColor:"white"
      }}>
        <View 
        
        style={{justifyContent:'space-between',flexDirection:'row',marginRight:25,alignItems:'center'}}>

         <TouchableOpacity onPress={onClose} 
         style={{width:54,height:60,justifyContent:'center',flexDirection:'row',marginLeft:10,alignItems:'center'}}>
       <Ionicons name='chevron-back' size={30}/>
       <Text style={{ color: '#000',fontSize:13 }}>Go Back</Text>
        </TouchableOpacity>
     

        <TouchableOpacity onPress={outSideMap} 
         style={{justifyContent:'center',flexDirection:'row',marginLeft:10,alignItems:'center'}}>
       
       <Text style={{ color: '#000',fontSize:13}}>View IN Map Application</Text>
        </TouchableOpacity>
           </View>
       {/* <View style={styles.centeredView}>
         <View style={styles.modalView}>
           <TouchableOpacity onPress={onClose} style={styles.closeButton}>
             <Text style={{ color: '#000' }}>Close</Text>
           </TouchableOpacity> */}
          <WebView 
            source={{           uri:url
          }}
            geolocationEnabled={true}
            javaScriptEnabled={true}
            userAgent="Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Mobile Safari/537.36"
            onError={(error) => console.error('WebView Error: ', error)}

          />
          </View>
       {/* </View>
       </View> */}
     </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    height:200,
    borderRadius: 10,
    // padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%', // Adjust the width as needed
  },
  closeButton: {
    textAlign:'right',
    marginBottom:20,
    marginLeft:20,
    fontWeight:'bold'
  },
});

export default CenteredWebView;
