import { useFormik } from "formik";
import { PhoneNumberUtil } from "google-libphonenumber";
import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Button, HelperText } from "react-native-paper";
import * as Yup from "yup";

import InputLabel from "../../components/InputLabel";
import { useCustomerManager } from "../../hooks/useCustomerManager";
import { useAppNavigation } from "../../hooks/useNavigation";

const phoneUtil = PhoneNumberUtil.getInstance();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

const AddCustomer = () => {
  const { navigate } = useAppNavigation();
  const { addCustomer } = useCustomerManager();

  const formik = useFormik({
    initialValues: {
      name: "",
      mobile: "",
      address: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Customer name is required")
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
    onSubmit: (values, formikHelpers) => {
      try {
        addCustomer({
          customer_name: values.name,
          mobile: values.mobile,
          address: values.address,
        });

        formikHelpers.resetForm();
        Alert.alert("Success", "Customer added successfully!");
        navigate("CustomerList");
      } catch (error) {
        if (error instanceof Error) {
          Alert.alert(error.message);
        } else {
          Alert.alert(String(error));
        }
      }
    },
  });

  return (
    <View style={styles.container}>
      <InputLabel isRequired label="Name" />
      <TextInput
        value={formik.values.name}
        onChangeText={formik.handleChange("name")}
        onBlur={formik.handleBlur("name")}
        error={formik.touched.name && !!formik.errors.name}
        mode="outlined"
      />
      <HelperText
        type="error"
        visible={formik.touched.name && !!formik.errors.name}
      >
        {formik.errors.name}
      </HelperText>

      <InputLabel isRequired label="Mobile" />
      <TextInput
        value={formik.values.mobile}
        onChangeText={formik.handleChange("mobile")}
        onBlur={formik.handleBlur("mobile")}
        error={formik.touched.mobile && !!formik.errors.mobile}
        mode="outlined"
        keyboardType="phone-pad"
        placeholder="+923001234567"
      />
      <HelperText
        type="error"
        visible={formik.touched.mobile && !!formik.errors.mobile}
      >
        {formik.errors.mobile}
      </HelperText>

      <InputLabel label="Address" />
      <TextInput
        value={formik.values.address}
        onChangeText={formik.handleChange("address")}
        onBlur={formik.handleBlur("address")}
        error={formik.touched.address && !!formik.errors.address}
        mode="outlined"
        multiline
        numberOfLines={3}
      />
      <HelperText
        type="error"
        visible={formik.touched.address && !!formik.errors.address}
      >
        {formik.errors.address}
      </HelperText>

      <Button mode="contained" onPress={() => formik.handleSubmit()}>
        Add Customer
      </Button>
    </View>
  );
};

export default AddCustomer;
