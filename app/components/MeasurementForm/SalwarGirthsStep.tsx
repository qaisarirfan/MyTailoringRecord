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

const SalwarGirthsStep: FC<Props> = ({ formik }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Salwar/Pant Girths</Text>
      {renderInput(formik, "Waist", "salwar_waist", "e.g., 30", true)}
      {renderInput(formik, "Hip", "salwar_hip", "e.g., 38", true)}
      {renderInput(formik, "Thigh Circumference", "thigh", "e.g., 22")}
      {renderInput(formik, "Knee Circumference", "knee", "e.g., 14")}
      {renderInput(formik, "Ankle Circumference", "ankle_width", "e.g., 10")}
      {renderInput(formik, "Bottom Opening", "bottom_opening", "e.g., 10")}
    </View>
  );
};

export default SalwarGirthsStep;
