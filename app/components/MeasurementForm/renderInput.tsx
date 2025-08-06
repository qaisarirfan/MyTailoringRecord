import { FormikProps } from "formik";
import { StyleSheet, View } from "react-native";
import { HelperText, TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { MeasurementFields } from "./types";
import InputLabel from "../InputLabel";

interface InputConfig {
  icon: string;
  helperText: string;
}

// Input configurations with icons and helper text
const inputConfigs: Record<keyof MeasurementFields, InputConfig> = {
  gender: {
    icon: "",
    helperText: "",
  },
  shoulder_width: {
    icon: "human",
    helperText: "Measure across the back from shoulder to shoulder",
  },
  chest: {
    icon: "tshirt-crew",
    helperText: "Measure around the fullest part of chest",
  },
  waist: {
    icon: "human",
    helperText: "Measure around the natural waistline",
  },
  hip: {
    icon: "human",
    helperText: "Measure around the fullest part of hips",
  },
  kameez_length: {
    icon: "ruler",
    helperText: "Measure from shoulder to desired length",
  },
  sleeve_length: {
    icon: "ruler",
    helperText: "Measure from shoulder to desired sleeve length",
  },
  armhole: {
    icon: "arm-flex",
    helperText: "Measure around the arm at shoulder joint",
  },
  bicep: {
    icon: "arm-flex",
    helperText: "Measure around the fullest part of upper arm",
  },
  neck_depth_front: {
    icon: "collar",
    helperText: "Measure from shoulder to desired front neck depth",
  },
  neck_depth_back: {
    icon: "collar",
    helperText: "Measure from shoulder to desired back neck depth",
  },
  side_slit_length: {
    icon: "ruler",
    helperText: "Measure from waist to desired slit length",
  },
  salwar_waist: {
    icon: "human",
    helperText: "Measure around the waist where salwar will sit",
  },
  salwar_hip: {
    icon: "human",
    helperText: "Measure around the fullest part of hips",
  },
  salwar_length: {
    icon: "ruler",
    helperText: "Measure from waist to desired length",
  },
  thigh: {
    icon: "human",
    helperText: "Measure around the fullest part of thigh",
  },
  knee: { icon: "human", helperText: "Measure around the knee" },
  ankle_width: { icon: "human", helperText: "Measure around the ankle" },
  cuff_width: {
    icon: "ruler",
    helperText: "Measure around the wrist for cuff fitting",
  },
  neck_circumference: {
    icon: "collar",
    helperText: "Measure around the base of the neck",
  },
  kameez_back_length: {
    icon: "ruler",
    helperText: "Measure from back shoulder to kameez bottom",
  },
  kameez_front_length: {
    icon: "ruler",
    helperText: "Measure from front shoulder to kameez bottom",
  },
  bust: {
    icon: "tshirt-crew",
    helperText: "Measure around the fullest part of the bust",
  },
  shoulder_to_bust_point: {
    icon: "arrow-down",
    helperText: "Measure vertically from shoulder to bust apex",
  },
  bust_point_to_bust_point: {
    icon: "arrow-left-right",
    helperText: "Measure horizontally between bust apex points",
  },
  crotch_depth: {
    icon: "ruler",
    helperText: "Measure from waist to crotch while seated",
  },
  flare_width: {
    icon: "expand",
    helperText: "Measure the hem width of the kameez (if flared)",
  },
};

const renderInput = (
  formik: FormikProps<MeasurementFields>,
  label: string,
  name: keyof MeasurementFields,
  placeholder: string,
  isRequired: boolean = false
) => (
  <View style={styles.inputContainer}>
    <InputLabel
      label={`${label} (inches)`}
      isRequired={isRequired}
      style={styles.inputLabel}
    />
    <HelperText padding="none" type="info" variant="bodySmall">
      {inputConfigs[name]?.helperText}
    </HelperText>
    <TextInput
      value={formik.values[name]?.toString()}
      onChangeText={formik.handleChange(name)}
      onBlur={formik.handleBlur(name)}
      keyboardType="numeric"
      placeholder={placeholder}
      mode="outlined"
      style={styles.input}
      outlineStyle={{ borderWidth: 1 }}
      error={formik.touched[name] && !!formik.errors[name]}
      left={
        <TextInput.Icon
          icon={() => <Icon name={inputConfigs[name]?.icon} size={20} />}
        />
      }
    />
    {formik.touched[name] && !!formik.errors[name] && (
      <HelperText type="error" padding="none">
        {formik.errors[name]}
      </HelperText>
    )}
  </View>
);

export default renderInput;

const styles = StyleSheet.create({
  input: {},
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    marginBottom: 0,
  },
});
