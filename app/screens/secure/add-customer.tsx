import { useFormik } from "formik";
import { PhoneNumberUtil } from "google-libphonenumber";
import React from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Text, HelperText } from "react-native-paper";
import * as Yup from "yup";

const phoneUtil = PhoneNumberUtil.getInstance();

const styles = StyleSheet.create({
  button: {
    marginTop: 16,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  error: {
    marginBottom: 8,
  },
  input: {},
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
});

const AddCustomer = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      mobile: "",
      address: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Name is required")
        .min(2, "Name must be at least 2 characters"),
      mobile: Yup.string()
        .required("Mobile number is required")
        .test(
          "is-valid-phone",
          "Invalid mobile number for Pakistan",
          (value) => {
            try {
              const phoneNumber = phoneUtil.parseAndKeepRawInput(value, "PK");
              return phoneUtil.isValidNumberForRegion(phoneNumber, "PK");
            } catch {
              return false;
            }
          }
        ),
      address: Yup.string().max(200, "Address must not exceed 200 characters"),
    }),
    onSubmit: (values) => {
      // Handle form submission
      console.log("Form submitted with values:", values);
      // Add your API call or navigation logic here
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Customer</Text>

      <TextInput
        label="Name"
        value={formik.values.name}
        onChangeText={formik.handleChange("name")}
        onBlur={formik.handleBlur("name")}
        error={formik.touched.name && !!formik.errors.name}
        mode="outlined"
        style={styles.input}
      />
      {formik.touched.name && formik.errors.name && (
        <HelperText type="error" style={styles.error}>
          {formik.errors.name}
        </HelperText>
      )}

      <TextInput
        label="Mobile (+92)"
        value={formik.values.mobile}
        onChangeText={formik.handleChange("mobile")}
        onBlur={formik.handleBlur("mobile")}
        error={formik.touched.mobile && !!formik.errors.mobile}
        mode="outlined"
        keyboardType="phone-pad"
        style={styles.input}
        placeholder="+923001234567"
      />
      {formik.touched.mobile && formik.errors.mobile && (
        <HelperText type="error" style={styles.error}>
          {formik.errors.mobile}
        </HelperText>
      )}

      <TextInput
        label="Address"
        value={formik.values.address}
        onChangeText={formik.handleChange("address")}
        onBlur={formik.handleBlur("address")}
        error={formik.touched.address && !!formik.errors.address}
        mode="outlined"
        multiline
        numberOfLines={3}
        style={styles.input}
      />
      {formik.touched.address && formik.errors.address && (
        <HelperText type="error" style={styles.error}>
          {formik.errors.address}
        </HelperText>
      )}

      <Button
        mode="contained"
        onPress={() => formik.handleSubmit()}
        style={styles.button}
        disabled={!formik.isValid || formik.isSubmitting}
      >
        <Text>Add Customer</Text>
      </Button>
    </View>
  );
};

export default AddCustomer;
