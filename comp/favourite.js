import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Favourite extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>I'm the Favorites component</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});