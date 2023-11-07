import React, { useEffect, useContext, useState } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { AuthContext } from '../../../AuthContext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import base_url from '../../constants/Constant';
import { ScrollView } from 'react-native-gesture-handler';
import { BarChart } from 'react-native-chart-kit';

const chartConfig = {
  backgroundGradientFrom: '#eeeeee',
  backgroundGradientTo: '#eeeeee',
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  hasXAxisBackgroundLines: false,
  barRadius: 1,
  barPercentage: 0.75,
};

export default function YourComponent() {
  const [userlist, setuserlist] = useState([]);
  const { userInfo } = useContext(AuthContext);
  const [loading, setLoading] = useState([]);
  const token = userInfo.auth_token;

  const updateuser = () => {
    fetch(`${base_url}/delivery/update-user-info`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        token: token,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        setuserlist(result.chart);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    updateuser();
  }, []);

  const someJsonArray = userlist?.chartData || [];

  const finalArray = someJsonArray.map(function (obj) {
    return obj.x;
  });

  const someJsonarray = userlist?.chartData || [];

  const finalarray = someJsonarray.map((item) => item.y);

  const data = finalarray.every((value) => value !== null)
    ? finalarray
    : fallbackData;

  const fallbackData = [1, 10, 1, 1, 1,10,20]; // Fallback data if rawData is null

  console.log('finalarray', data);

  return (
    <ScrollView style={{ top: 14 }} horizontal={true}>
      {data && data.every((element) => element === 0) !== undefined && (
        <BarChart
          data={{
            labels: finalArray,
            datasets: [
              {
                data: finalarray,
              },
            ],
          }}
          width={Dimensions.get('window').width } // Adjust the width to display all bars
          height={Dimensions.get('window').height / 2}
          chartConfig={chartConfig}
          style={styles.chart}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  chart: {
    padding: 10,
    paddingTop: 20,
    borderRadius: 4,
    backgroundColor: '#eeeeee',
  },
});
