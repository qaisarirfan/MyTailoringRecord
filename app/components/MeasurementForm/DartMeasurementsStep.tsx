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

const DartMeasurementsStep: FC<Props> = ({ formik }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Dart Measurements</Text>
      {formik.values.gender === "female" &&
        renderInput(
          formik,
          "Dart Length Front",
          "dart_length_front",
          "e.g., 30"
        )}
      {formik.values.gender === "female" &&
        renderInput(formik, "Dart Length Back", "dart_length_back", "e.g., 30")}
    </View>
  );
};

export default DartMeasurementsStep;
