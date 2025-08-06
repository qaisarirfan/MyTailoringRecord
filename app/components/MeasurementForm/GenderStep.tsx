import { FormikProps } from "formik";
import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SegmentedButtons, HelperText } from "react-native-paper";

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
  segmentedButtons: {
    marginBottom: 10,
  },
});

interface Props {
  formik: FormikProps<MeasurementFields>;
}

const GenderStep: FC<Props> = ({ formik }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle} />
      <SegmentedButtons
        value={formik.values.gender}
        onValueChange={formik.handleChange("gender")}
        buttons={[
          { value: "female", label: "Female", icon: "human-female" },
          { value: "male", label: "Male", icon: "human-male" },
        ]}
        style={styles.segmentedButtons}
      />
      <HelperText
        type={formik.touched.gender && formik.errors.gender ? "error" : "info"}
      >
        {formik.touched.gender && formik.errors.gender
          ? formik.errors.gender
          : "Select your gender to customize measurements"}
      </HelperText>
    </View>
  );
};

export default GenderStep;
