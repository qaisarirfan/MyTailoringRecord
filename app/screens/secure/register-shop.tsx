import { FormikHelpers, useFormik } from "formik";
import { PhoneNumberUtil } from "google-libphonenumber";
import React from "react";
import { View, StyleSheet, Alert, ScrollView } from "react-native";
import {
  TextInput,
  Button,
  SegmentedButtons,
  HelperText,
} from "react-native-paper";
import * as Yup from "yup";

import InputLabel from "../../components/InputLabel";
import { useShopManager } from "../../hooks/useShopManager";

const phoneUtil = PhoneNumberUtil.getInstance();

const validationSchema = Yup.object().shape({
  shop_name: Yup.string().required("Shop name is required"),
  owner_name: Yup.string().required("Owner name is required"),
  mobile: Yup.string()
    .required("Mobile number is required")
    .test("is-valid-mobile", "Invalid mobile number", (value) => {
      try {
        const number = phoneUtil.parse(value ?? "", "PK");
        return phoneUtil.isValidNumber(number);
      } catch {
        return false;
      }
    }),
  shop_type: Yup.string()
    .oneOf(["ladies", "gents", "both"])
    .required("Select shop type"),
});

interface FormValues {
  shop_name: string;
  owner_name: string;
  mobile: string;
  shop_type: string;
}

const RegisterShop: React.FC = () => {
  const { addShop, currentShop } = useShopManager();

  const formik = useFormik<FormValues>({
    initialValues: {
      shop_name: currentShop?.shop_name ?? "",
      owner_name: currentShop?.owner_name ?? "",
      mobile: currentShop?.mobile ?? "",
      shop_type: currentShop?.shop_type ?? "",
    },
    validationSchema: validationSchema,
    onSubmit: (
      values: FormValues,
      formikHelpers: FormikHelpers<FormValues>
    ) => {
      try {
        addShop({
          shop_name: values.shop_name,
          owner_name: values.owner_name,
          mobile: values.mobile,
          shop_type: values.shop_type,
        });

        formikHelpers.resetForm();
        Alert.alert("Success", "Shop registered successfully!");
      } catch (error) {
        if (error instanceof Error) {
          // If it's a generic JavaScript Error
          Alert.alert(
            `An unexpected error occurred while adding shop: ${error.message}`
          );
        } else {
          // Fallback for unknown error types
          Alert.alert(
            `An unknown error occurred while adding shop: ${String(error)}`
          );
        }
      }
    },
  });

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
    setFieldValue,
  } = formik;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <InputLabel isRequired label="Shop Name" />
        <TextInput
          mode="outlined"
          value={values.shop_name}
          onChangeText={handleChange("shop_name")}
          onBlur={handleBlur("shop_name")}
          error={!!(touched.shop_name && errors.shop_name)}
        />
        <HelperText
          visible={!!(touched.shop_name && errors.shop_name)}
          type="error"
        >
          {errors.shop_name}
        </HelperText>

        <InputLabel isRequired label="Owner Name" />
        <TextInput
          mode="outlined"
          value={values.owner_name}
          onChangeText={handleChange("owner_name")}
          onBlur={handleBlur("owner_name")}
          error={!!(touched.owner_name && errors.owner_name)}
        />
        <HelperText
          visible={!!(touched.owner_name && errors.owner_name)}
          type="error"
        >
          {errors.owner_name}
        </HelperText>

        <InputLabel isRequired label="Mobile Number" />
        <TextInput
          mode="outlined"
          keyboardType="phone-pad"
          value={values.mobile}
          onChangeText={handleChange("mobile")}
          onBlur={handleBlur("mobile")}
          error={!!(touched.mobile && errors.mobile)}
          readOnly={Boolean(currentShop?.mobile)}
        />
        <HelperText visible={!!(touched.mobile && errors.mobile)} type="error">
          {errors.mobile}
        </HelperText>

        <InputLabel isRequired label="Shop Type" />
        <SegmentedButtons
          value={values.shop_type}
          onValueChange={(val) => setFieldValue("shop_type", val)}
          buttons={[
            {
              value: "ladies",
              label: "Ladies",
              icon: "human-female",
            },
            {
              value: "gents",
              label: "Gents",
              icon: "human-male",
            },
            {
              value: "both",
              label: "Both",
              icon: "human-male-female",
            },
          ]}
        />
        <HelperText
          visible={!!(touched.shop_type && errors.shop_type)}
          type="error"
        >
          {errors.shop_type}
        </HelperText>
        <Button
          mode="contained"
          onPress={() => handleSubmit()}
          disabled={!!currentShop}
        >
          Register Shop
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
  content: {
    padding: 16,
    flex: 1,
  },
});

export default RegisterShop;
