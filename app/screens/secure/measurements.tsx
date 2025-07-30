import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import {
  Button,
  TextInput,
  SegmentedButtons,
  ProgressBar,
  HelperText,
} from "react-native-paper";
import { Formik, FormikProps } from "formik";
import * as Yup from "yup";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// Define interface for form values
interface Measurements {
  gender: string;
  shoulder_width: number | null;
  chest_bust: number | null;
  waist: number | null;
  hip: number | null;
  kameez_length: number | null;
  sleeve_length: number | null;
  armhole: number | null;
  upper_arm: number | null;
  neck_depth_front: number | null;
  neck_depth_back: number | null;
  bust_point: number | null;
  slit_length: number | null;
  salwar_waist: number | null;
  salwar_hip: number | null;
  salwar_length: number | null;
  thigh: number | null;
  knee: number | null;
  ankle: number | null;
  inseam: number | null;
  dupatta_length: number | null;
  dupatta_width: number | null;
}

// Define interface for input configurations
interface InputConfig {
  icon: string;
  helperText: string;
}

// Yup validation schema
const validationSchema = [
  Yup.object().shape({
    gender: Yup.string().required("Gender is required").oneOf(["Men", "Women"]),
  }),
  Yup.object().shape({
    shoulder_width: Yup.number()
      .positive("Must be a positive number")
      .required("Required"),
    chest_bust: Yup.number()
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
        if (gender === "Women") {
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
const initialValues: Measurements = {
  gender: __DEV__ ? "Men" : "",
  shoulder_width: null,
  chest_bust: null,
  waist: null,
  hip: null,
  kameez_length: null,
  sleeve_length: null,
  armhole: null,
  upper_arm: null,
  neck_depth_front: null,
  neck_depth_back: null,
  bust_point: null,
  slit_length: null,
  salwar_waist: null,
  salwar_hip: null,
  salwar_length: null,
  thigh: null,
  knee: null,
  ankle: null,
  inseam: null,
  dupatta_length: null,
  dupatta_width: null,
};

// Input configurations with icons and helper text
const inputConfigs: Record<keyof Omit<Measurements, "gender">, InputConfig> = {
  shoulder_width: {
    icon: "human",
    helperText: "Measure across the back from shoulder to shoulder",
  },
  chest_bust: {
    icon: "tshirt-crew",
    helperText: "Measure around the fullest part of chest/bust",
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
  upper_arm: {
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
  bust_point: {
    icon: "human-female",
    helperText: "Measure from shoulder to fullest part of bust",
  },
  slit_length: {
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
  ankle: { icon: "human", helperText: "Measure around the ankle" },
  inseam: { icon: "ruler", helperText: "Measure from crotch to ankle" },
  dupatta_length: {
    icon: "ruler",
    helperText: "Measure desired length of dupatta",
  },
  dupatta_width: {
    icon: "ruler",
    helperText: "Measure desired width of dupatta",
  },
};

const Measurements: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const totalSteps: number = 4;

  // Render input field with icon
  const renderInput = (
    formik: FormikProps<Measurements>,
    label: string,
    name: keyof Measurements,
    placeholder: string
  ) => (
    <View style={styles.inputContainer}>
      <TextInput
        label={`${label} (inches)`}
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
            icon={() => (
              <Icon
                name={name !== "gender" ? inputConfigs[name]?.icon : ""}
                size={20}
              />
            )}
          />
        }
      />
      <HelperText
        type={formik.touched[name] && formik.errors[name] ? "error" : "info"}
      >
        {formik.errors[name]
          ? formik.errors[name]
          : name !== "gender"
          ? inputConfigs[name]?.helperText
          : null}
      </HelperText>
    </View>
  );

  const handleSubmit = (values: Measurements) => {
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
            <Text style={styles.title}>Salwar Kameez Measurement</Text>

            {/* Step 1: Gender Selection */}
            {step === 1 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Select Gender</Text>
                <SegmentedButtons
                  value={formik.values.gender}
                  onValueChange={formik.handleChange("gender")}
                  buttons={[
                    { value: "Women", label: "Women", icon: "human-female" },
                    { value: "Men", label: "Men", icon: "human-male" },
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
                <Text style={styles.sectionTitle}>
                  {formik.values.gender === "Women"
                    ? "Kurta Measurements"
                    : "Kameez Measurements"}
                </Text>
                {renderInput(
                  formik,
                  "Shoulder Width",
                  "shoulder_width",
                  "e.g., 14"
                )}
                {renderInput(
                  formik,
                  formik.values.gender === "Women" ? "Bust" : "Chest",
                  "chest_bust",
                  "e.g., 36"
                )}
                {renderInput(formik, "Waist", "waist", "e.g., 30")}
                {renderInput(formik, "Hip", "hip", "e.g., 38")}
                {renderInput(
                  formik,
                  formik.values.gender === "Women"
                    ? "Kameez Length"
                    : "Kurta Length",
                  "kameez_length",
                  "e.g., 40"
                )}
                {renderInput(
                  formik,
                  "Sleeve Length",
                  "sleeve_length",
                  "e.g., 16"
                )}
                {renderInput(formik, "Armhole", "armhole", "e.g., 16")}
                {renderInput(
                  formik,
                  "Upper Arm Circumference",
                  "upper_arm",
                  "e.g., 12"
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
                {formik.values.gender === "Women" &&
                  renderInput(formik, "Bust Point", "bust_point", "e.g., 10")}
                {renderInput(formik, "Slit Length", "slit_length", "e.g., 12")}
              </View>
            )}

            {/* Step 3: Salwar Measurements */}
            {step === 3 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  {formik.values.gender === "Women"
                    ? "Salwar/Churidar Measurements"
                    : "Salwar Measurements"}
                </Text>
                {renderInput(formik, "Waist", "salwar_waist", "e.g., 30")}
                {renderInput(formik, "Hip", "salwar_hip", "e.g., 38")}
                {renderInput(formik, "Length", "salwar_length", "e.g., 38")}
                {renderInput(
                  formik,
                  "Thigh Circumference",
                  "thigh",
                  "e.g., 22"
                )}
                {renderInput(formik, "Knee Circumference", "knee", "e.g., 14")}
                {renderInput(
                  formik,
                  "Ankle Circumference",
                  "ankle",
                  "e.g., 10"
                )}
                {renderInput(formik, "Inseam", "inseam", "e.g., 30")}
              </View>
            )}

            {/* Step 4: Dupatta Measurements */}
            {step === 4 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  Dupatta Measurements (Optional)
                </Text>
                {renderInput(
                  formik,
                  "Dupatta Length",
                  "dupatta_length",
                  "e.g., 90"
                )}
                {renderInput(
                  formik,
                  "Dupatta Width",
                  "dupatta_width",
                  "e.g., 40"
                )}
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
                  Back
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    backgroundColor: "#fff",
  },
  segmentedButtons: {
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 40,
  },
  navButton: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default Measurements;
