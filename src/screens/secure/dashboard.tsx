import React from 'react';
import { StyleSheet, Button, ScrollView, Text, StatusBar } from 'react-native';

export const Dashboard = () => {
  const email = null;
  return (
    <ScrollView
      keyboardDismissMode="interactive"
      contentContainerStyle={Styles.scrollView}
    >
      <Text>{`Welcome ${email}`}</Text>
      <Button title="Logout" />
    </ScrollView>
  );
};

const Styles = StyleSheet.create({
  container: { display: 'flex', flex: 1 },
  scrollView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
});

export default Dashboard;
