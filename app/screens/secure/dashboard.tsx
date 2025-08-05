import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { Avatar, Card, IconButton, Divider } from "react-native-paper";

import { useShopManager } from "../../hooks/useShopManager";

// Define reusable left and right components
const AddCustomerLeft = (props: any) => (
  <Avatar.Icon {...props} icon="face-man" />
);
const AddCustomerRight = (props: any) => <IconButton {...props} icon="plus" />;

const AddMeasurementsLeft = (props: any) => (
  <Avatar.Icon {...props} icon="ruler" />
);
const AddMeasurementsRight = (props: any) => (
  <IconButton {...props} icon="plus" />
);

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    padding: 16,
  },
  divider: {
    marginVertical: 16,
  },
});

const Dashboard = () => {
  const { currentShop } = useShopManager();
  const { navigate } = useNavigation<
    NativeStackNavigationProp<{
      AddCustomer: undefined;
      Measurements: undefined;
      CustomerList: undefined;
    }>
  >();

  return (
    <ScrollView
      keyboardDismissMode="interactive"
      contentContainerStyle={styles.scrollView}
    >
      <Card.Title
        titleVariant="displaySmall"
        title={currentShop?.shop_name}
        subtitleVariant="titleSmall"
        subtitle={`${currentShop?.owner_name}(${currentShop?.mobile})`}
      />
      <View style={styles.divider} />
      <Card mode="contained" onPress={() => navigate("AddCustomer")}>
        <Card.Title
          title="Add customer"
          subtitle="Card Subtitle"
          left={AddCustomerLeft}
          right={AddCustomerRight}
        />
      </Card>

      <Divider style={styles.divider} />

      <Card mode="contained" onPress={() => navigate("CustomerList")}>
        <Card.Title
          titleVariant="titleMedium"
          title="Customers"
          subtitle="Card Subtitle"
          left={AddCustomerLeft}
          right={AddMeasurementsRight}
        />
      </Card>

      <Divider style={styles.divider} />

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
