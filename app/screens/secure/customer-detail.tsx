import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Card, Divider, Button } from "react-native-paper";
import { BSON } from "realm";

import InputLabel from "../../components/InputLabel";
import { MeasurementFields } from "../../components/MeasurementForm/types";
import { useCustomerManager } from "../../hooks/useCustomerManager";
import { useMeasurementManager } from "../../hooks/useMeasurementManager";
import { useAppNavigation } from "../../hooks/useNavigation";
import { Measurement } from "../../models/Measurement";

type ParamList = {
  CustomerDetail: {
    customerId: string;
  };
};

const renderMeasurementGrid = (measurement: Measurement) => {
  const commonKameezFields = [
    "shoulder_width",
    "neck_circumference",
    "neck_depth_front",
    "neck_depth_back",
    "armhole",
    "bicep",
    "sleeve_length",
    "cuff_width",
    "chest",
    "waist",
    "hip",
    "kameez_length",
    "kameez_front_length",
    "kameez_back_length",
    "side_slit_length",
    "flare_width",
    "collar_size",
    "shoulder_slope",
    "cross_back",
    "elbow",
  ];

  const salwarFields = [
    "salwar_waist",
    "salwar_hip",
    "crotch_depth",
    "thigh",
    "knee",
    "salwar_length",
    "ankle_width",
    "rise_back",
    "rise_front",
    "bottom_opening",
  ];

  const femaleOnlyFields = [
    "bust",
    "under_bust",
    "shoulder_to_bust_point",
    "bust_point_to_bust_point",
    "dart_length_front",
    "dart_length_back",
    "hip_depth",
    "flare_length",
  ];

  const renderGridItems = (fields: string[]) =>
    fields.map((key) => {
      const value = measurement[key as keyof MeasurementFields];

      if (!value) return null;
      return (
        <Card key={key} style={styles.gridItem} mode="outlined">
          <Text style={styles.gridLabel}>{key.replace(/_/g, " ")}</Text>
          <Text style={styles.gridValue}>{value}</Text>
        </Card>
      );
    });

  return (
    <View>
      <Text style={styles.sectionHeader}>Kameez Measurements</Text>
      <View style={styles.gridContainer}>
        {renderGridItems(commonKameezFields)}
      </View>
      {measurement.gender === "female" && (
        <>
          <Text style={styles.sectionHeader}>Bust Measurements</Text>
          <View style={styles.gridContainer}>
            {renderGridItems(femaleOnlyFields)}
          </View>
        </>
      )}
      <Text style={styles.sectionHeader}>Salwar Measurements</Text>
      <View style={styles.gridContainer}>{renderGridItems(salwarFields)}</View>
    </View>
  );
};

const CustomerDetail = () => {
  const route = useRoute<RouteProp<ParamList, "CustomerDetail">>();
  const navigation = useAppNavigation();

  const customerId = new BSON.ObjectId(route.params.customerId);

  const { getCustomerById } = useCustomerManager();
  const { getMeasurementsForCustomer } = useMeasurementManager();

  const customer = getCustomerById(customerId);

  const measurements = getMeasurementsForCustomer(customerId);

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
            <Text variant="titleLarge">{customer?.customer_name || "-"}</Text>
            <Divider style={{ marginBlock: 8 }} />
            <InputLabel label="Mobile" />
            <Text variant="titleLarge" selectable>
              {customer?.mobile || "-"}
            </Text>
            <Divider style={{ marginBlock: 8 }} />
            <InputLabel label="Address" />
            <Text variant="titleLarge">{customer?.address || "-"}</Text>
          </Card.Content>
        </Card>

        {!measurements.length ? (
          <Button
            icon="tape-measure"
            mode="contained"
            onPress={handleAddMeasurement}
          >
            Add Measurement
          </Button>
        ) : (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 12,
              justifyContent: "space-between",
            }}
          >
            <Button
              icon="tape-measure"
              mode="contained"
              onPress={handleAddMeasurement}
            >
              Update Measurement
            </Button>
            <Button
              mode="contained"
              onPress={() =>
                navigation.navigate("AdditionalCustomizationOptions", {
                  customerId: route.params.customerId,
                })
              }
            >
              Additional Customization Options
            </Button>
          </View>
        )}

        {measurements.length > 0 && renderMeasurementGrid(measurements[0])}
      </ScrollView>
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
  card: {
    marginBottom: 16,
    borderColor: "transparent",
  },
  section: {},
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  gridItem: {
    width: "48%",
    padding: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "transparent",
  },
  gridLabel: {
    fontSize: 12,
    marginBottom: 8,
    textTransform: "capitalize",
  },
  gridValue: {
    fontWeight: "bold",
    fontSize: 14,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 12,
  },
});

export default CustomerDetail;
