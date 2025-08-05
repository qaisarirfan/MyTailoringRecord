import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, FAB, Card, Divider } from "react-native-paper";
import { RouteProp, useRoute } from "@react-navigation/native";
import { ObjectId } from "bson";

import { useCustomerManager } from "../../hooks/useCustomerManager";
import { useAppNavigation } from "../../hooks/useNavigation";
import InputLabel from "../../components/InputLabel";

type ParamList = {
  CustomerDetail: {
    customerId: string;
  };
};

const CustomerDetail = () => {
  const route = useRoute<RouteProp<ParamList, "CustomerDetail">>();
  const navigation = useAppNavigation();

  const { getCustomerById } = useCustomerManager();

  const customer = getCustomerById(new ObjectId(route.params.customerId));

  const handleAddMeasurement = () => {
    navigation.navigate("AddMeasurement", {
      customerId: route.params.customerId,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.card} mode="outlined">
          <Card.Content>
            <InputLabel label="Name" />
            <Text>{customer?.customer_name || "-"}</Text>
            <Divider />
            <InputLabel label="Mobile" />
            <Text>{customer?.mobile || "-"}</Text>
            <Divider />
            <InputLabel label="Address" />
            <Text>{customer?.address || "-"}</Text>
          </Card.Content>
        </Card>
      </ScrollView>

      <FAB
        icon="tape-measure"
        label="Add Measurement"
        onPress={handleAddMeasurement}
        style={[styles.fab]}
        mode="flat"
        variant="primary"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  card: {},
  section: {},
  fab: {
    position: "absolute",
    right: 16,
    bottom: 24,
  },
});

export default CustomerDetail;
