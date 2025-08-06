import { useFormik } from "formik";
import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import {
  RadioButton,
  Text,
  Button,
  Divider,
  HelperText,
} from "react-native-paper";
import * as Yup from "yup";

import { useAppNavigation } from "../../hooks/useNavigation";
import { colors } from "../../styles/colors";

const styles = StyleSheet.create({
  buttonContainer: {
    borderTopColor: colors.grayLight,
    borderTopWidth: 1,
    padding: 16,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  errorText: {},
  saveButton: {},
  title: {
    marginBottom: 20,
    textAlign: "center",
  },
});

const ShopType = () => {
  const navigation = useAppNavigation();
  const formik = useFormik({
    initialValues: {
      shop_type: "",
    },
    validationSchema: Yup.object({
      shop_type: Yup.string().required("Please select a shop type"),
    }),
    onSubmit: (values) => {
      navigation.navigate("Dashboard");
      return Promise.resolve(values);
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>
          Select Shop Type
        </Text>

        <RadioButton.Group
          onValueChange={(value) => formik.setFieldValue("shop_type", value)}
          value={formik.values.shop_type}
        >
          <RadioButton.Item label="Gents only" value="gents" />
          <Divider />
          <RadioButton.Item label="Ladies only" value="ladies" />
          <Divider />
          <RadioButton.Item label="Ladies and Gents" value="both" />
          <Divider />
        </RadioButton.Group>

        {formik.touched.shop_type && formik.errors.shop_type && (
          <HelperText type="error" style={styles.errorText}>
            {formik.errors.shop_type}
          </HelperText>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => formik.handleSubmit()}
          style={styles.saveButton}
          disabled={formik.isSubmitting}
        >
          Save
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default ShopType;
