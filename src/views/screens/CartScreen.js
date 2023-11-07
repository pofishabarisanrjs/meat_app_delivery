import React from 'react';
import { Text,View,Button,RefreshControl, SafeAreaView, ScrollView, StyleSheet,TouchableOpacity } from 'react-native';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const Notification = () => {
  const [count, setCount] = React.useState(0);
  const [refreshing, setRefreshing] = React.useState(false);
  
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setCount(true);
    // wait(1000).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
         <View style={styles.head}>
            <Text style={{fontSize:24,fontWeight:'bold',color:'black'}}> welcome  </Text>
            <TouchableOpacity onPress={onRefresh}> 
          <Text style={styles. logout}>Refresh</Text>
      </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <Button onPress={() => setCount((c) => c + 1)} title="Update count" />
    <Text>Count: {count}</Text>
        <TouchableOpacity onPress={onRefresh}>
        <Text>Refresh</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
 flex:1
  },
  scrollView: {
    flex:1,
     backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
  head:{
    width:'100%',
    height:60,
    backgroundColor:'white',
    alignItems:'center',
    flexDirection:'row',
   
  },
  logout:{
    left:180,
    fontSize:14,
    backgroundColor:'#4ae3ff',
    padding:8,
    borderRadius:4
  }
});

export default Notification;
