import React from 'react';
import { Button,RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text,TouchableOpacity } from 'react-native';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const RefreshController = () => {
  const [count, setCount] = React.useState(0);
  const [refreshing, setRefreshing] = React.useState(false);
  
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
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
});

export default RefreshController;