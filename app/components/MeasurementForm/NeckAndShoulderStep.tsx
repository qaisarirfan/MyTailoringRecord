import { FormikProps } from "formik";
import React, { FC } from "react";
import { View, StyleSheet } from "react-native";

import renderInput from "./renderInput";
import { MeasurementFields } from "./types";
import { Text } from "react-native-paper";

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

const NeckAndShoulderStep: FC<Props> = ({ formik }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Neck & Shoulder</Text>
      {renderInput(
        formik,
        "Neck Circumference",
        "neck_circumference",
        "e.g., 15.5",
        true
      )}
      {renderInput(formik, "Collar Size", "collar_size", "e.g., 1.5")}
      {renderInput(
        formik,
        "Neck Depth (Front)",
        "neck_depth_front",
        "e.g., 3.5"
      )}
      {renderInput(formik, "Neck Depth (Back)", "neck_depth_back", "e.g., 1.5")}
      {renderInput(
        formik,
        "Shoulder Width",
        "shoulder_width",
        "e.g., 18",
        true
      )}
      {renderInput(formik, "Shoulder Slope", "shoulder_slope", "e.g., 12")}
      {renderInput(formik, "Cross Back", "cross_back", "e.g., 12")}
    </View>
  );
};

export default NeckAndShoulderStep;
