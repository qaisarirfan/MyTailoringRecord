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

const ArmAndSleeveStep: FC<Props> = ({ formik }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Arm & Sleeve</Text>
      {renderInput(formik, "Armhole", "armhole", "e.g., 9.5", true)}
      {renderInput(formik, "Bicep", "bicep", "e.g., 12", true)}
      {renderInput(formik, "Elbow", "elbow", "e.g., 7")}
      {renderInput(formik, "Sleeve Length", "sleeve_length", "e.g., 24", true)}
      {renderInput(formik, "Cuff Width", "cuff_width", "e.g., 7")}
    </View>
  );
};

export default ArmAndSleeveStep;
