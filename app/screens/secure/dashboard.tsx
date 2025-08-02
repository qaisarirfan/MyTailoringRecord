import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Avatar, Card, IconButton, Divider } from "react-native-paper";

// Define reusable left and right components
const AddCustomerLeft = (props: any) => (
  <Avatar.Icon {...props} icon="face-man" />
);
const AddCustomerRight = (props: any) => (
  <IconButton {...props} icon="plus" onPress={() => {}} />
);

const AddMeasurementsLeft = (props: any) => (
  <Avatar.Icon {...props} icon="ruler" />
);
const AddMeasurementsRight = (props: any) => (
  <IconButton {...props} icon="plus" onPress={() => {}} />
);

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    padding: 12,
  },
});

const Dashboard = () => {
  const { navigate } = useNavigation<
    NativeStackNavigationProp<{
      AddCustomer: undefined;
      Measurements: undefined;
    }>
  >();

  return (
    <ScrollView
      keyboardDismissMode="interactive"
      contentContainerStyle={styles.scrollView}
    >
      <Card mode="contained" onPress={() => navigate("AddCustomer")}>
        <Card.Title
          title="Add customers"
          subtitle="Card Subtitle"
          left={AddCustomerLeft}
          right={AddCustomerRight}
        />
      </Card>

      <Divider />

      <Card mode="contained" onPress={() => navigate("Measurements")}>
        <Card.Title
          title="Add measurements"
          subtitle="Card Subtitle"
          left={AddMeasurementsLeft}
          right={AddMeasurementsRight}
        />
      </Card>
    </ScrollView>
  );
};

export default Dashboard;
