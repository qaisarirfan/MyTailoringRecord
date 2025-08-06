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

const SalwarStep: FC<Props> = ({ formik }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Salwar</Text>
      {renderInput(formik, "Waist", "salwar_waist", "e.g., 30")}
      {renderInput(formik, "Hip", "salwar_hip", "e.g., 38")}
      {renderInput(formik, "Crotch Depth", "crotch_depth", "e.g., 38")}
      {renderInput(formik, "Thigh Circumference", "thigh", "e.g., 22")}
      {renderInput(formik, "Knee Circumference", "knee", "e.g., 14")}
      {renderInput(formik, "Length", "salwar_length", "e.g., 38")}
      {renderInput(formik, "Ankle Circumference", "ankle_width", "e.g., 10")}
    </View>
  );
};

export default SalwarStep;
