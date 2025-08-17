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

const KameezLengthsStep: FC<Props> = ({ formik }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Kameez/Tunic Lengths</Text>
      {renderInput(formik, "Kameez Length", "kameez_length", "e.g., 40", true)}
      {renderInput(
        formik,
        "Kameez Front Length",
        "kameez_front_length",
        "e.g., 40"
      )}
      {renderInput(
        formik,
        "Kameez Back Length",
        "kameez_back_length",
        "e.g., 40"
      )}
      {renderInput(formik, "Slit Length", "side_slit_length", "e.g., 12")}
      {renderInput(formik, "Flare Width", "flare_width", "e.g., 12")}
      {formik.values.gender === "female" &&
        renderInput(formik, "Flare Length", "flare_length", "e.g., 12")}
    </View>
  );
};

export default KameezLengthsStep;
