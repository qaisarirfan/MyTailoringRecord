import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import {
  RadioButton,
  Text,
  Button,
  Divider,
  HelperText,
} from "react-native-paper";
import { useFormik } from "formik";
import * as Yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const ShopType = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<{ Dashboard: undefined }>>();
  const formik = useFormik({
    initialValues: {
      shop_type: "",
    },
    validationSchema: Yup.object({
      shop_type: Yup.string().required("Please select a shop type"),
    }),
    onSubmit: async (values) => {
      try {
        await AsyncStorage.setItem("shop_type", values.shop_type);
        navigation.navigate("Dashboard");
      } catch (error) {
        console.error("Error saving shop type:", error);
      }
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    marginBottom: 20,
    textAlign: "center",
  },
  errorText: {},
  buttonContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  saveButton: {},
});

export default ShopType;
