import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Button, ScrollView, Text, StatusBar } from "react-native";
import { Avatar, Card, IconButton, Icon, Divider } from "react-native-paper";

export const Dashboard = () => {
  const email = null;
  const { navigate } = useNavigation();
  return (
    <ScrollView
      keyboardDismissMode="interactive"
      contentContainerStyle={Styles.scrollView}
    >
      <Card mode="contained" onPress={() => navigate("AddCustomer")}>
        <Card.Title
          title="Add customers"
          subtitle="Card Subtitle"
          left={(props) => <Avatar.Icon {...props} icon="face-man" />}
          right={(props) => (
            <IconButton {...props} icon="plus" onPress={() => {}} />
          )}
        />
      </Card>
      <Divider style={{ marginBlock: 12 }}></Divider>
      <Card mode="contained" onPress={() => navigate("Measurements")}>
        <Card.Title
          title="Add measurements"
          subtitle="Card Subtitle"
          left={(props) => <Avatar.Icon {...props} icon="ruler" />}
          right={(props) => (
            <IconButton {...props} icon="plus" onPress={() => {}} />
          )}
        />
      </Card>
    </ScrollView>
  );
};

const Styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    padding: 12,
  },
});

export default Dashboard;
