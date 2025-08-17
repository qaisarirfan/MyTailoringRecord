import { RouteProp, useRoute } from "@react-navigation/native";
import { useFormik } from "formik";
import React, { ReactNode, useMemo, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { BSON } from "realm";
import * as Yup from "yup";

import ArmAndSleeveStep from "../../components/MeasurementForm/ArmAndSleeveStep";
import DartMeasurementsStep from "../../components/MeasurementForm/DartMeasurementsStep";
import GenderStep from "../../components/MeasurementForm/GenderStep";
import KameezLengthsStep from "../../components/MeasurementForm/KameezLengthsStep";
import NeckAndShoulderStep from "../../components/MeasurementForm/NeckAndShoulderStep";
import SalwarGirthsStep from "../../components/MeasurementForm/SalwarGirthsStep";
import SalwarLengthsStep from "../../components/MeasurementForm/SalwarLengthsStep";
import { MeasurementFields } from "../../components/MeasurementForm/types";
import UpperBodyGirthsStep from "../../components/MeasurementForm/UpperBodyGirthsStep";
import WaistAndHipStep from "../../components/MeasurementForm/WaistAndHipStep";
import { useMeasurementManager } from "../../hooks/useMeasurementManager";
import { useAppNavigation } from "../../hooks/useNavigation";
import { useShopManager } from "../../hooks/useShopManager";

// Yup validation schema
const validationSchema = [
  // Step 1: Gender selection
  Yup.object().shape({
    gender: Yup.string()
      .required("Gender is required")
      .oneOf(["male", "female"], "Invalid gender"),
  }),

  // Step 2: Neck & Shoulder
  Yup.object<MeasurementFields>().shape({
    neck_circumference: Yup.number().when("gender", {
      is: "male",
      then: (schema) =>
        schema
          .typeError("Neck circumference must be a number")
          .positive("Neck circumference must be positive")
          .required("Neck circumference is required for male"),
      otherwise: (schema) => schema.nullable(),
    }),
    collar_size: Yup.number().when("gender", {
      is: "male",
      then: (schema) =>
        schema
          .typeError("Collar size must be a number")
          .positive("Collar size must be positive")
          .required("Collar size is required"),
      otherwise: (schema) => schema.nullable(),
    }),
    neck_depth_front: Yup.number()
      .nullable()
      .transform((v, o) => (o === "" ? null : v))
      .positive("Neck depth front must be positive"),
    neck_depth_back: Yup.number()
      .nullable()
      .transform((v, o) => (o === "" ? null : v))
      .positive("Neck depth back must be positive"),
    shoulder_width: Yup.number()
      .typeError("Shoulder width must be a number")
      .positive("Shoulder width must be positive")
      .required("Shoulder width is required"),
    shoulder_slope: Yup.number()
      .nullable()
      .transform((v, o) => (o === "" ? null : v))
      .positive("Shoulder slope must be positive"),
    cross_back: Yup.number().when("gender", {
      is: "female",
      then: (schema) =>
        schema
          .typeError("Cross back must be a number")
          .positive("Cross back must be positive")
          .nullable(),
      otherwise: (schema) => schema.nullable(),
    }),
  }),
  // Step 3: Upper Body Girths
  Yup.object<MeasurementFields>().shape({
    chest: Yup.number().when("gender", {
      is: "male",
      then: (schema) =>
        schema
          .typeError("Chest must be a number")
          .positive("Chest must be positive")
          .required("Chest is required for male"),
      otherwise: (schema) => schema.nullable(),
    }),
    bust: Yup.number().when("gender", {
      is: "female",
      then: (schema) =>
        schema
          .typeError("Bust must be a number")
          .positive("Bust must be positive")
          .required("Bust is required for female"),
      otherwise: (schema) => schema.nullable(),
    }),
    under_bust: Yup.number().when("gender", {
      is: "female",
      then: (schema) =>
        schema
          .nullable()
          .transform((v, o) => (o === "" ? null : v))
          .positive("Under bust must be positive"),
      otherwise: (schema) => schema.nullable(),
    }),
    bust_point_to_bust_point: Yup.number().when("gender", {
      is: "female",
      then: (schema) =>
        schema
          .typeError("Bust point to bust point must be a number")
          .positive("Bust point to bust point must be positive")
          .nullable(),
      otherwise: (schema) => schema.nullable(),
    }),
    shoulder_to_bust_point: Yup.number().when("gender", {
      is: "female",
      then: (schema) =>
        schema
          .nullable()
          .transform((v, o) => (o === "" ? null : v))
          .positive("Shoulder to bust point must be positive"),
      otherwise: (schema) => schema.nullable(),
    }),
  }),
  // Step 4: Waist & Hip
  Yup.object<MeasurementFields>().shape({
    waist: Yup.number()
      .typeError("Waist must be a number")
      .positive("Waist must be positive")
      .required("Waist is required"),
    hip: Yup.number()
      .typeError("Hip must be a number")
      .positive("Hip must be positive")
      .required("Hip is required"),
    hip_depth: Yup.number()
      .nullable()
      .transform((v, o) => (o === "" ? null : v))
      .positive("Hip depth must be positive"),
  }),
  // Step 5: Arm & Sleeve
  Yup.object<MeasurementFields>().shape({
    armhole: Yup.number()
      .typeError("Armhole must be a number")
      .positive("Armhole must be positive")
      .required("Armhole is required"),
    bicep: Yup.number()
      .typeError("Bicep must be a number")
      .positive("Bicep must be positive")
      .required("Bicep is required"),
    elbow: Yup.number()
      .nullable()
      .transform((v, o) => (o === "" ? null : v))
      .positive("Elbow must be positive"),
    sleeve_length: Yup.number()
      .typeError("Sleeve length must be a number")
      .positive("Sleeve length must be positive")
      .required("Sleeve length is required"),
    cuff_width: Yup.number()
      .nullable()
      .transform((v, o) => (o === "" ? null : v))
      .positive("Cuff width must be positive"),
  }),
  // Step 6: Kameez/Tunic Lengths
  Yup.object<MeasurementFields>().shape({
    kameez_length: Yup.number()
      .typeError("Kameez length must be a number")
      .positive("Kameez length must be positive")
      .required("Kameez length is required"),
    kameez_front_length: Yup.number()
      .nullable()
      .transform((v, o) => (o === "" ? null : v))
      .positive("Kameez front length must be positive"),
    kameez_back_length: Yup.number()
      .nullable()
      .transform((v, o) => (o === "" ? null : v))
      .positive("Kameez back length must be positive"),
    side_slit_length: Yup.number()
      .nullable()
      .transform((v, o) => (o === "" ? null : v))
      .positive("Side slit length must be positive"),
    flare_width: Yup.number()
      .nullable()
      .transform((v, o) => (o === "" ? null : v))
      .positive("Flare width must be positive"),
    flare_length: Yup.number()
      .nullable()
      .transform((v, o) => (o === "" ? null : v))
      .positive("Flare length must be positive"),
  }),
  // Step 6: Salwar/Pant Girths
  Yup.object<MeasurementFields>().shape({
    salwar_waist: Yup.number()
      .typeError("Salwar waist must be a number")
      .positive("Salwar waist must be positive")
      .required("Salwar waist is required"),
    salwar_hip: Yup.number()
      .typeError("Salwar hip must be a number")
      .positive("Salwar hip must be positive")
      .required("Salwar hip is required"),
    thigh: Yup.number()
      .nullable()
      .transform((v, o) => (o === "" ? null : v))
      .positive("Thigh must be positive"),
    knee: Yup.number()
      .nullable()
      .transform((v, o) => (o === "" ? null : v))
      .positive("Knee must be positive"),
    ankle_width: Yup.number()
      .nullable()
      .transform((v, o) => (o === "" ? null : v))
      .positive("Ankle width must be positive"),
    bottom_opening: Yup.number()
      .nullable()
      .transform((v, o) => (o === "" ? null : v))
      .positive("Bottom opening must be positive"),
  }),
  // Step 7: Salwar/Pant Lengths
  Yup.object<MeasurementFields>().shape({
    crotch_depth: Yup.number()
      .typeError("Crotch depth must be a number")
      .positive("Crotch depth must be positive")
      .required("Crotch depth is required"),
    rise_front: Yup.number()
      .nullable()
      .transform((v, o) => (o === "" ? null : v))
      .positive("Rise front must be positive"),
    rise_back: Yup.number()
      .nullable()
      .transform((v, o) => (o === "" ? null : v))
      .positive("Rise back must be positive"),
    salwar_length: Yup.number()
      .typeError("Salwar length must be a number")
      .positive("Salwar length must be positive")
      .required("Salwar length is required"),
  }),
  // Step 8: Dart Measurements (Women)
  Yup.object<MeasurementFields>().shape({
    dart_length_front: Yup.number().when("gender", {
      is: "female",
      then: (schema) =>
        schema
          .nullable()
          .transform((v, o) => (o === "" ? null : v))
          .positive("Dart length front must be positive"),
      otherwise: (schema) => schema.nullable(),
    }),
    dart_length_back: Yup.number().when("gender", {
      is: "female",
      then: (schema) =>
        schema
          .nullable()
          .transform((v, o) => (o === "" ? null : v))
          .positive("Dart length back must be positive"),
      otherwise: (schema) => schema.nullable(),
    }),
  }),
];

// Initial form values
const initialValues: MeasurementFields = {
  gender: "male",

  shoulder_width: __DEV__ ? "18" : null, // Shoulder point to shoulder point
  neck_circumference: __DEV__ ? "15" : null, // Around base of neck
  neck_depth_front: null, // Front neckline depth
  neck_depth_back: null, // Back neckline depth
  chest: __DEV__ ? "40" : null, // Male: chest fullest part; Female: bust fullest part
  waist: __DEV__ ? "36" : null, // Around natural waistline
  hip: __DEV__ ? "40" : null, // Around fullest part of hip
  armhole: __DEV__ ? "18" : null, // Around armhole (scye)
  bicep: __DEV__ ? "13" : null, // Around widest part of upper arm
  sleeve_length: __DEV__ ? "24" : null, // Shoulder point to wrist
  cuff_width: null, // Wrist opening circumference
  elbow: null, // Around elbow for fitted sleeves
  kameez_length: __DEV__ ? "42" : null, // Shoulder to hem
  kameez_front_length: null, // Shoulder to front hem
  kameez_back_length: null, // Shoulder to back hem
  side_slit_length: null, // Hem upwards to slit start
  flare_width: null, // Width of kameez hem when spread
  cross_back: null, // Across back from armhole to armhole
  shoulder_slope: null, // Drop from neck point to shoulder point
  collar_size: __DEV__ ? "15" : null, // Collar band circumference

  salwar_waist: __DEV__ ? "36" : null, // Waist circumference
  salwar_hip: __DEV__ ? "40" : null, // Around fullest part of hip
  crotch_depth: __DEV__ ? "14" : null, // Waist to crotch point
  thigh: null, // Around widest part of thigh
  knee: null, // Around knee
  ankle_width: null, // Around ankle or pant opening
  salwar_length: __DEV__ ? "42" : null, // Waist to ankle
  bottom_opening: null, // Hem width of salwar/pant
  rise_front: null, // Front rise
  rise_back: null, // Back rise

  // ===== WOMEN-SPECIFIC =====
  bust_point_to_bust_point: null, // Distance between bust points
  bust: __DEV__ ? "38" : null, // Around fullest bust point
  dart_length_back: null, // Shoulder blade to waist dart
  dart_length_front: null, // Bust apex to waist dart
  flare_length: null, // Waist to hem for anarkali or frock styles
  hip_depth: null, // Waist to hip vertical distance
  shoulder_to_bust_point: null, // Shoulder point to bust apex
  under_bust: null, // Around ribcage under bust
};

type ParamList = {
  AddMeasurement: {
    customerId: string;
  };
};

const AddMeasurement = () => {
  const route = useRoute<RouteProp<ParamList, "AddMeasurement">>();
  const { navigate } = useAppNavigation();
  const { addMeasurement, getMeasurementsForCustomer, editMeasurement } =
    useMeasurementManager();
  const { currentShop } = useShopManager();

  const [step, setStep] = useState<number>(1);

  const customerId = new BSON.ObjectId(route.params.customerId);
  const isShopForBoth = currentShop?.shop_type === "both";

  const totalSteps = isShopForBoth ? 9 : 8;

  const measurements = getMeasurementsForCustomer(customerId);

  const formik = useFormik<MeasurementFields>({
    initialValues: {
      ...initialValues,
      gender: currentShop?.shop_type === "ladies" ? "female" : "male",
      bust: currentShop?.shop_type === "ladies" ? initialValues.bust : null,
      collar_size:
        currentShop?.shop_type === "gents" ? initialValues.collar_size : null,
    },
    onSubmit: (values, formikHelpers) => {
      const [first] = measurements;
      if (step !== totalSteps) {
        setStep(step + 1);
      } else {
        if (first) {
          editMeasurement(first._id, values);
        } else {
          addMeasurement(customerId, values);
        }
        navigate("CustomerDetail", { customerId: route.params.customerId });
        formikHelpers.resetForm();
        setStep(1);
      }
    },
    validationSchema: isShopForBoth
      ? validationSchema[step - 1]
      : validationSchema.slice(1)[step - 1],
  });

  const stepsForBoth: ReactNode[] = [
    <GenderStep formik={formik} />,
    <NeckAndShoulderStep formik={formik} />,
    <UpperBodyGirthsStep formik={formik} />,
    <WaistAndHipStep formik={formik} />,
    <ArmAndSleeveStep formik={formik} />,
    <KameezLengthsStep formik={formik} />,
    <SalwarGirthsStep formik={formik} />,
    <SalwarLengthsStep formik={formik} />,
    <DartMeasurementsStep formik={formik} />,
  ];

  const stepsForSingle: ReactNode[] = [
    <NeckAndShoulderStep formik={formik} />,
    <UpperBodyGirthsStep formik={formik} />,
    <WaistAndHipStep formik={formik} />,
    <ArmAndSleeveStep formik={formik} />,
    <KameezLengthsStep formik={formik} />,
    <SalwarGirthsStep formik={formik} />,
    <SalwarLengthsStep formik={formik} />,
    <DartMeasurementsStep formik={formik} />,
  ];

  const selectedSteps = isShopForBoth ? stepsForBoth : stepsForSingle;

  // Convert to your `Record<number, ReactNode>` format
  const steps: Record<number, ReactNode> = useMemo(
    () =>
      selectedSteps.reduce((acc, step, idx) => {
        acc[idx + 1] = step;
        return acc;
      }, {} as Record<number, ReactNode>),
    [formik]
  );

  return (
    <ScrollView style={styles.container}>
      {steps[step]}

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
};

export default AddMeasurement;

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
  navButton: {
    flex: 1,
    marginHorizontal: 5,
  },
});
