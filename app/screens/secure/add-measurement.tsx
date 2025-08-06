import { RouteProp, useRoute } from "@react-navigation/native";
import { ObjectId } from "bson";
import { useFormik } from "formik";
import React, { ReactNode, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import * as Yup from "yup";

import GenderStep from "../../components/MeasurementForm/GenderStep";
import KameezStep from "../../components/MeasurementForm/KameezStep";
import SalwarStep from "../../components/MeasurementForm/SalwarStep";
import { MeasurementFields } from "../../components/MeasurementForm/types";
import { useMeasurementManager } from "../../hooks/useMeasurementManager";
import { useAppNavigation } from "../../hooks/useNavigation";
import { useShopManager } from "../../hooks/useShopManager";

// Yup validation schema
const validationSchema = [
  Yup.object().shape({
    gender: Yup.string()
      .required("Gender is required")
      .oneOf(["male", "female"], "Invalid gender"),
  }),
  Yup.object<MeasurementFields>().shape({
    shoulder_width: Yup.number()
      .typeError("Shoulder width must be a number")
      .positive("Shoulder width must be positive")
      .required("Shoulder width is required"),
    neck_circumference: Yup.number().when("gender", {
      is: "male",
      then: (schema) =>
        schema
          .typeError("Neck circumference must be a number")
          .positive("Neck circumference must be positive")
          .required("Neck circumference is required for male"),
      otherwise: (schema) => schema.nullable(),
    }),
    neck_depth_front: Yup.number()
      .typeError("Neck depth front must be a number")
      .positive("Neck depth front must be positive")
      .required("Neck depth front is required"),
    neck_depth_back: Yup.number()
      .typeError("Neck depth back must be a number")
      .positive("Neck depth back must be positive")
      .required("Neck depth back is required"),
    bicep: Yup.number()
      .typeError("Bicep must be a number")
      .positive("Bicep must be positive")
      .required("Bicep is required"),
    armhole: Yup.number()
      .typeError("Armhole must be a number")
      .positive("Armhole must be positive")
      .required("Armhole is required"),
    sleeve_length: Yup.number()
      .typeError("Sleeve length must be a number")
      .positive("Sleeve length must be positive")
      .required("Sleeve length is required"),
    cuff_width: Yup.number()
      .typeError("Cuff width must be a number")
      .positive("Cuff width must be positive")
      .required("Cuff width is required"),
    bust: Yup.number().when("gender", {
      is: "female",
      then: (schema) =>
        schema
          .typeError("Bust must be a number")
          .positive("Bust must be positive")
          .required("Bust is required for female"),
      otherwise: (schema) => schema.nullable(),
    }),
    chest: Yup.number().when("gender", {
      is: "male",
      then: (schema) =>
        schema
          .typeError("Chest must be a number")
          .positive("Chest must be positive")
          .required("Chest is required"),
      otherwise: (schema) => schema.nullable(),
    }),
    shoulder_to_bust_point: Yup.number().when("gender", {
      is: "female",
      then: (schema) =>
        schema
          .typeError("Shoulder to bust point must be a number")
          .positive("Shoulder to bust point must be positive")
          .required("Shoulder to bust point is required for female"),
      otherwise: (schema) => schema.nullable(),
    }),
    bust_point_to_bust_point: Yup.number().when("gender", {
      is: "female",
      then: (schema) =>
        schema
          .typeError("Bust point to bust point must be a number")
          .positive("Bust point to bust point must be positive")
          .required("Bust point to bust point is required for female"),
      otherwise: (schema) => schema.nullable(),
    }),

    waist: Yup.number()
      .typeError("Waist must be a number")
      .positive("Waist must be positive")
      .required("Waist is required"),
    hip: Yup.number()
      .typeError("Hip must be a number")
      .positive("Hip must be positive")
      .required("Hip is required"),
    kameez_length: Yup.number()
      .typeError("Kameez length must be a number")
      .positive("Kameez length must be positive")
      .required("Kameez length is required"),
    kameez_back_length: Yup.number()
      .nullable()
      .transform((value, originalValue) =>
        originalValue === "" ? null : value
      )
      .positive("Kameez back length must be positive"),
    kameez_front_length: Yup.number()
      .nullable()
      .transform((value, originalValue) =>
        originalValue === "" ? null : value
      )
      .positive("Kameez front length must be positive"),
    side_slit_length: Yup.number()
      .typeError("Side slit length must be a number")
      .positive("Side slit length must be positive")
      .required("Side slit length is required"),
    flare_width: Yup.number()
      .nullable()
      .transform((value, originalValue) =>
        originalValue === "" ? null : value
      )
      .positive("Flare width must be positive"),
  }),
  Yup.object<MeasurementFields>().shape({
    salwar_waist: Yup.number()
      .typeError("Salwar waist must be a number")
      .positive("Salwar waist must be positive")
      .required("Salwar waist is required"),
    salwar_hip: Yup.number()
      .typeError("Salwar hip must be a number")
      .positive("Salwar hip must be positive")
      .required("Salwar hip is required"),
    crotch_depth: Yup.number()
      .nullable()
      .transform((value, originalValue) =>
        originalValue === "" ? null : value
      )
      .positive("Crotch depth must be positive"),
    thigh: Yup.number()
      .typeError("Thigh must be a number")
      .positive("Thigh must be positive")
      .required("Thigh is required"),
    knee: Yup.number()
      .typeError("Knee must be a number")
      .positive("Knee must be positive")
      .required("Knee is required"),
    salwar_length: Yup.number()
      .typeError("Salwar length must be a number")
      .positive("Salwar length must be positive")
      .required("Salwar length is required"),
    ankle_width: Yup.number()
      .typeError("Ankle width must be a number")
      .positive("Ankle width must be positive")
      .required("Ankle width is required"),
  }),
];

// Initial form values
const initialValues: MeasurementFields = {
  gender: "male",

  shoulder_width: null,
  neck_circumference: null,
  neck_depth_front: null,
  neck_depth_back: null,
  chest: null,
  bust: null,
  shoulder_to_bust_point: null,
  bust_point_to_bust_point: null,
  waist: null,
  hip: null,
  armhole: null,
  bicep: null,
  sleeve_length: null,
  cuff_width: null,
  kameez_length: null,
  kameez_front_length: null,
  kameez_back_length: null,
  side_slit_length: null,
  flare_width: null,

  salwar_waist: null,
  salwar_hip: null,
  crotch_depth: null,
  thigh: null,
  knee: null,
  ankle_width: null,
  salwar_length: null,
};

type ParamList = {
  AddMeasurement: {
    customerId: string;
  };
};

const AddMeasurement = () => {
  const route = useRoute<RouteProp<ParamList, "AddMeasurement">>();
  const { navigate } = useAppNavigation();
  const { addMeasurement } = useMeasurementManager();
  const { currentShop } = useShopManager();

  const [step, setStep] = useState<number>(1);

  const isShopForBoth = currentShop?.shop_type === "both";

  const totalSteps = isShopForBoth ? 3 : 2;

  const formik = useFormik<MeasurementFields>({
    initialValues: {
      ...initialValues,
      gender: currentShop?.shop_type === "ladies" ? "female" : "male",
    },
    onSubmit: (values, formikHelpers) => {
      console.log(values);
      if (step !== totalSteps) {
        setStep(step + 1);
      } else {
        addMeasurement(new ObjectId(route.params.customerId), values);
        navigate("CustomerDetail", { customerId: route.params.customerId });
        formikHelpers.resetForm();
        setStep(1);
      }
    },
    validationSchema: isShopForBoth
      ? validationSchema[step - 1]
      : validationSchema.slice(1)[step - 1],
  });

  console.log(formik.errors);

  const steps: Record<number, ReactNode> = {
    1: isShopForBoth ? (
      <GenderStep formik={formik} />
    ) : (
      <KameezStep formik={formik} />
    ),
    2: isShopForBoth ? (
      <KameezStep formik={formik} />
    ) : (
      <SalwarStep formik={formik} />
    ),
    3: isShopForBoth ? <SalwarStep formik={formik} /> : null,
  };

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
