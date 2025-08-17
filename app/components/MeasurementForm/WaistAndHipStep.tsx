import { FormikProps } from "formik";
import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";

import renderInput from "./renderInput";
import { MeasurementFields } from "./types";

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
});

interface Props {
  formik: FormikProps<MeasurementFields>;
}

const WaistAndHipStep: FC<Props> = ({ formik }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Waist & Hip</Text>
      {renderInput(formik, "Waist", "waist", "e.g., 30", true)}
      {renderInput(formik, "Hip", "hip", "e.g., 38", true)}
      {renderInput(formik, "Hip Depth", "hip_depth", "e.g., 10")}
    </View>
  );
};

export default WaistAndHipStep;
