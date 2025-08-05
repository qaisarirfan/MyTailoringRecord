import { Formik, FormikProps } from "formik";
import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import {
  Button,
  TextInput,
  SegmentedButtons,
  HelperText,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as Yup from "yup";

import InputLabel from "../../components/InputLabel";
import { colors } from "../../styles/colors";

// Define interface for form values
interface MeasurementsFields {
  gender: "male" | "female";
  armhole: number | null;
  bicep: number | null;
  chest: number | null;
  cuff_width: number | null;
  hip: number | null;
  kameez_back_length: number | null;
  kameez_front_length: number | null;
  kameez_length: number | null;
  neck_circumference: number | null;
  neck_depth_back: number | null;
  neck_depth_front: number | null;
  shoulder_width: number | null;
  side_slit_length: number | null;
  sleeve_length: number | null;
  waist: number | null;

  ankle_width: number | null;
  crotch_depth: number | null;
  flare_width: number | null;
  knee: number | null;
  salwar_hip: number | null;
  salwar_length: number | null;
  salwar_waist: number | null;
  thigh: number | null;

  bust: number | null;
  shoulder_to_bust_point: number | null;
  bust_point_to_bust_point: number | null;
}

// Define interface for input configurations
interface InputConfig {
  icon: string;
  helperText: string;
}

// Yup validation schema
const validationSchema = [
  Yup.object().shape({
    gender: Yup.string()
      .required("Gender is required")
      .oneOf(["male", "female"]),
  }),
  Yup.object().shape({
    shoulder_width: Yup.number()
      .positive("Must be a positive number")
      .required("Required"),
    chest: Yup.number()
      .positive("Must be a positive number")
      .required("Required"),
    waist: Yup.number()
      .positive("Must be a positive number")
      .required("Required"),
    hip: Yup.number()
      .positive("Must be a positive number")
      .required("Required"),
    kameez_length: Yup.number()
      .positive("Must be a positive number")
      .required("Required"),
    sleeve_length: Yup.number()
      .positive("Must be a positive number")
      .required("Required"),
    armhole: Yup.number()
      .positive("Must be a positive number")
      .required("Required"),
    upper_arm: Yup.number()
      .positive("Must be a positive number")
      .required("Required"),
    neck_depth_front: Yup.number()
      .positive("Must be a positive number")
      .required("Required"),
    neck_depth_back: Yup.number()
      .positive("Must be a positive number")
      .required("Required"),
    bust_point: Yup.number()
      .positive("Must be a positive number")
      .when("gender", ([gender], schema) => {
        if (gender === "female") {
          return schema.required("Required");
        }
        return schema.nullable();
      }),
  }),
  Yup.object().shape({
    slit_length: Yup.number()
      .positive("Must be a positive number")
      .required("Required"),
    salwar_waist: Yup.number()
      .positive("Must be a positive number")
      .required("Required"),
    salwar_hip: Yup.number()
      .positive("Must be a positive number")
      .required("Required"),
    salwar_length: Yup.number()
      .positive("Must be a positive number")
      .required("Required"),
    thigh: Yup.number()
      .positive("Must be a positive number")
      .required("Required"),
    knee: Yup.number()
      .positive("Must be a positive number")
      .required("Required"),
    ankle: Yup.number()
      .positive("Must be a positive number")
      .required("Required"),
    inseam: Yup.number()
      .positive("Must be a positive number")
      .required("Required"),
  }),
  Yup.object().shape({
    dupatta_length: Yup.number()
      .positive("Must be a positive number")
      .notRequired(),
    dupatta_width: Yup.number()
      .positive("Must be a positive number")
      .notRequired(),
  }),
];

// Initial form values
const initialValues: MeasurementsFields = {
  gender: "male",

  armhole: null,
  bicep: null,
  chest: null,
  cuff_width: null,
  hip: null,
  kameez_back_length: null,
  kameez_front_length: null,
  kameez_length: null,
  neck_circumference: null,
  neck_depth_back: null,
  neck_depth_front: null,
  shoulder_width: null,
  side_slit_length: null,
  sleeve_length: null,
  waist: null,

  ankle_width: null,
  crotch_depth: null,
  flare_width: null,
  knee: null,
  salwar_hip: null,
  salwar_length: null,
  salwar_waist: null,
  thigh: null,

  // woman kameez
  bust: null,
  shoulder_to_bust_point: null,
  bust_point_to_bust_point: null,

  // woman salwar
};

// Input configurations with icons and helper text
const inputConfigs: Record<keyof MeasurementsFields, InputConfig> = {
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

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
    marginTop: 20,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    backgroundColor: colors.white,
  },
  inputContainer: {
    marginBottom: 15,
  },
  navButton: {
    flex: 1,
    marginHorizontal: 5,
  },
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
});

// Render input field with icon
const renderInput = (
  formik: FormikProps<MeasurementsFields>,
  label: string,
  name: keyof MeasurementsFields,
  placeholder: string
) => (
  <View style={styles.inputContainer}>
    <InputLabel label={`${label} (inches)`} />
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
      error={formik.touched[name] && !!formik.errors[name]}
      left={
        <TextInput.Icon
          icon={() => <Icon name={inputConfigs[name]?.icon} size={20} />}
        />
      }
    />
    <HelperText
      visible={formik.touched[name] && !!formik.errors[name]}
      type={"error"}
      padding="none"
    >
      {formik.errors[name]}
    </HelperText>
  </View>
);

const Measurements = () => {
  const [step, setStep] = useState<number>(1);
  const totalSteps: number = 4;

  const handleSubmit = () => {
    if (step !== totalSteps) {
      setStep(step + 1);
    }
    // setStep(1); // Reset to first step
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema[step - 1]}
      onSubmit={handleSubmit}
    >
      {(formik) => {
        return (
          <ScrollView style={styles.container}>
            {/* Step 1: Gender Selection */}
            {step === 1 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Select Gender</Text>
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
                  type={
                    formik.touched.gender && formik.errors.gender
                      ? "error"
                      : "info"
                  }
                >
                  {formik.touched.gender && formik.errors.gender
                    ? formik.errors.gender
                    : "Select your gender to customize measurements"}
                </HelperText>
              </View>
            )}

            {/* Step 2: Kameez/Kurta Measurements */}
            {step === 2 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Kameez</Text>
                {renderInput(
                  formik,
                  "Shoulder Width",
                  "shoulder_width",
                  "e.g., 14"
                )}
                {renderInput(
                  formik,
                  "Neck Circumference",
                  "neck_circumference",
                  "e.g., 6"
                )}
                {renderInput(
                  formik,
                  "Neck Depth (Front)",
                  "neck_depth_front",
                  "e.g., 6"
                )}
                {renderInput(
                  formik,
                  "Neck Depth (Back)",
                  "neck_depth_back",
                  "e.g., 4"
                )}
                {renderInput(formik, "Bicep", "bicep", "e.g., 12")}
                {renderInput(formik, "Armhole", "armhole", "e.g., 16")}
                {renderInput(
                  formik,
                  "Sleeve Length",
                  "sleeve_length",
                  "e.g., 16"
                )}
                {renderInput(formik, "Cuff Width", "cuff_width", "e.g., 14")}
                {renderInput(
                  formik,
                  formik.values.gender === "female" ? "Bust" : "Chest",
                  formik.values.gender === "female" ? "bust" : "chest",
                  "e.g., 36"
                )}
                {formik.values.gender === "female" &&
                  renderInput(
                    formik,
                    "Shoulder To Bust Point",
                    "shoulder_to_bust_point",
                    "e.g., 30"
                  )}
                {formik.values.gender === "female" &&
                  renderInput(
                    formik,
                    "Bust Point To Bust Point",
                    "bust_point_to_bust_point",
                    "e.g., 30"
                  )}
                {renderInput(formik, "Waist", "waist", "e.g., 30")}
                {renderInput(formik, "Hip", "hip", "e.g., 38")}
                {renderInput(
                  formik,
                  "Kameez Length",
                  "kameez_length",
                  "e.g., 40"
                )}
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
                {renderInput(
                  formik,
                  "Slit Length",
                  "side_slit_length",
                  "e.g., 12"
                )}
                {renderInput(formik, "Flare Width", "flare_width", "e.g., 12")}
              </View>
            )}

            {/* Step 3: Salwar Measurements */}
            {step === 3 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Salwar</Text>
                {renderInput(formik, "Waist", "salwar_waist", "e.g., 30")}
                {renderInput(formik, "Hip", "salwar_hip", "e.g., 38")}
                {renderInput(
                  formik,
                  "Crotch Depth",
                  "crotch_depth",
                  "e.g., 38"
                )}
                {renderInput(
                  formik,
                  "Thigh Circumference",
                  "thigh",
                  "e.g., 22"
                )}
                {renderInput(formik, "Knee Circumference", "knee", "e.g., 14")}
                {renderInput(formik, "Length", "salwar_length", "e.g., 38")}
                {renderInput(
                  formik,
                  "Ankle Circumference",
                  "ankle_width",
                  "e.g., 10"
                )}
              </View>
            )}

            {/* Step 4: Dupatta Measurements */}
            {step === 4 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  Dupatta Measurements (Optional)
                </Text>
              </View>
            )}

            {/* Navigation Buttons */}
            <View style={styles.buttonContainer}>
              {step > 1 && (
                <Button
                  mode="outlined"
                  onPress={() => setStep(step - 1)}
                  style={styles.navButton}
                  icon="arrow-left"
                >
                  <Text>Back</Text>
                </Button>
              )}

              <Button
                mode="contained"
                onPress={() => {
                  formik.handleSubmit();
                }}
                style={styles.navButton}
                icon={step < totalSteps ? "arrow-right" : "content-save"}
                {...(step === totalSteps && {
                  theme: { colors: { primary: "#4CAF50" } },
                })}
              >
                {step < totalSteps ? "Next" : "Save Measurements"}
              </Button>
            </View>
          </ScrollView>
        );
      }}
    </Formik>
  );
};

export default Measurements;
