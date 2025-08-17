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

const SalwarLengthsStep: FC<Props> = ({ formik }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Salwar/Pant Lengths</Text>
      {renderInput(formik, "Crotch Depth", "crotch_depth", "e.g., 38", true)}
      {renderInput(formik, "Rise Front", "rise_front", "e.g., 10")}
      {renderInput(formik, "Rise Back", "rise_back", "e.g., 10")}
      {renderInput(formik, "Length", "salwar_length", "e.g., 38", true)}
    </View>
  );
};

export default SalwarLengthsStep;
