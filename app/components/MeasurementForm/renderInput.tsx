import { FormikProps } from "formik";
import { StyleSheet, View, useColorScheme } from "react-native";
import { HelperText, TextInput, useTheme } from "react-native-paper";
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
    icon: "account",
    helperText: "Select gender for accurate measurement requirements",
  },
  shoulder_width: {
    icon: "human-male-height",
    helperText: "Measure across the back from shoulder tip to shoulder tip",
  },
  neck_circumference: {
    icon: "tape-measure",
    helperText: "Measure around the base of the neck",
  },
  neck_depth_front: {
    icon: "tape-measure",
    helperText: "Measure vertically from shoulder to desired front neck depth",
  },
  neck_depth_back: {
    icon: "tape-measure",
    helperText: "Measure vertically from shoulder to desired back neck depth",
  },
  chest: {
    icon: "tshirt-crew",
    helperText: "Measure around the fullest part of chest (men)",
  },
  bust: {
    icon: "tshirt-crew",
    helperText: "Measure around the fullest part of the bust (women)",
  },
  shoulder_to_bust_point: {
    icon: "arrow-down",
    helperText: "Measure vertically from shoulder to bust apex (women)",
  },
  bust_point_to_bust_point: {
    icon: "arrow-left-right",
    helperText: "Measure horizontally between bust apex points (women)",
  },
  waist: {
    icon: "tape-measure",
    helperText: "Measure around the natural waistline",
  },
  hip: {
    icon: "tape-measure",
    helperText: "Measure around the fullest part of hips",
  },
  armhole: {
    icon: "arm-flex",
    helperText: "Measure around the arm at the shoulder joint",
  },
  bicep: {
    icon: "arm-flex",
    helperText: "Measure around the fullest part of upper arm",
  },
  sleeve_length: {
    icon: "ruler",
    helperText: "Measure from shoulder tip to desired sleeve length",
  },
  cuff_width: {
    icon: "ruler",
    helperText: "Measure around the wrist for cuff fitting",
  },
  elbow: {
    icon: "ruler",
    helperText: "Measure around the elbow for fitted sleeve designs",
  },
  kameez_length: {
    icon: "ruler",
    helperText: "Measure from shoulder to the bottom of the kameez",
  },
  kameez_front_length: {
    icon: "ruler",
    helperText:
      "Measure from front shoulder to kameez bottom (for high-low styles)",
  },
  kameez_back_length: {
    icon: "ruler",
    helperText: "Measure from back shoulder to kameez bottom",
  },
  side_slit_length: {
    icon: "ruler",
    helperText: "Measure from bottom of armhole to end of side slit",
  },
  flare_width: {
    icon: "expand-all",
    helperText: "Measure the width of the flare at the hem",
  },
  cross_back: {
    icon: "human-male-height",
    helperText: "Measure across the back from armhole to armhole",
  },
  shoulder_slope: {
    icon: "triangle-outline",
    helperText: "Measure the slope angle from neck to shoulder tip",
  },
  collar_size: {
    icon: "tape-measure",
    helperText: "Measure around the neck where collar will sit (men)",
  },

  // Salwar / Bottoms
  salwar_waist: {
    icon: "tape-measure",
    helperText: "Measure around waist where salwar will sit",
  },
  salwar_hip: {
    icon: "tape-measure",
    helperText: "Measure around fullest part of hips",
  },
  crotch_depth: {
    icon: "ruler",
    helperText: "Measure from waist to crotch while seated",
  },
  thigh: {
    icon: "tape-measure",
    helperText: "Measure around the fullest part of thigh",
  },
  knee: {
    icon: "tape-measure",
    helperText: "Measure around the knee",
  },
  ankle_width: {
    icon: "tape-measure",
    helperText: "Measure around the ankle for bottom opening",
  },
  salwar_length: {
    icon: "ruler",
    helperText: "Measure from waist to desired salwar length",
  },
  bottom_opening: {
    icon: "tape-measure",
    helperText: "Measure the width of the leg opening at the bottom",
  },
  rise_front: {
    icon: "ruler",
    helperText: "Measure from waist front to crotch point",
  },
  rise_back: {
    icon: "ruler",
    helperText: "Measure from waist back to crotch point",
  },

  // Women’s special
  under_bust: {
    icon: "tape-measure",
    helperText: "Measure around ribcage just under the bust",
  },
  dart_length_front: {
    icon: "arrow-down",
    helperText: "Measure from bust apex to dart end (front)",
  },
  dart_length_back: {
    icon: "arrow-down",
    helperText: "Measure from back shoulder blade to dart end",
  },
  hip_depth: {
    icon: "arrow-down",
    helperText: "Measure vertically from waist to fullest part of hip",
  },
  flare_length: {
    icon: "ruler",
    helperText: "Measure length of flare from waist or hip downwards",
  },
};

const renderInput = (
  formik: FormikProps<MeasurementFields>,
  label: string,
  name: keyof MeasurementFields,
  placeholder: string,
  isRequired: boolean = false
) => {
  const theme = useTheme();
  return (
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
            icon={() => (
              <Icon
                name={inputConfigs[name]?.icon}
                size={20}
                color={theme.colors.primary}
              />
            )}
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
};

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
