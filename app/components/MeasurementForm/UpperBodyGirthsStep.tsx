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

const UpperBodyGirthsStep: FC<Props> = ({ formik }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Upper Body Girths</Text>
      {renderInput(
        formik,
        formik.values.gender === "female" ? "Bust" : "Chest",
        formik.values.gender === "female" ? "bust" : "chest",
        "e.g., 36",
        true
      )}
      {formik.values.gender === "female" &&
        renderInput(formik, "Under Bust", "under_bust", "e.g., 30")}
      {formik.values.gender === "female" &&
        renderInput(
          formik,
          "Bust Point To Bust Point",
          "bust_point_to_bust_point",
          "e.g., 30"
        )}
      {formik.values.gender === "female" &&
        renderInput(
          formik,
          "Shoulder To Bust Point",
          "shoulder_to_bust_point",
          "e.g., 30"
        )}
    </View>
  );
};

export default UpperBodyGirthsStep;
