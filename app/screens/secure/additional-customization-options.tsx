import { RouteProp, useRoute } from "@react-navigation/native";
import { useFormik } from "formik";
import React from "react";
import { StyleSheet, Switch } from "react-native";
import { Button, List } from "react-native-paper";
import { BSON } from "realm";
import * as Yup from "yup";

import OptionSelectionModal from "../../components/OptionSelectionModal";
import ScreenWrapper from "../../components/ScreenWrapper";
import {
  MEN_CUSTOMIZATIONS,
  MEN_BOTTOM_POCKET_OPTIONS,
  MEN_BUTTON_OPTIONS,
  MEN_KAMEEZ_POCKET_OPTIONS,
  NECKLINE_OPTIONS_MEN,
  NECKLINE_OPTIONS_WOMEN,
  SALWAR_OPTIONS_MEN,
  SALWAR_OPTIONS_WOMEN,
  WOMEN_CUSTOMIZATIONS,
  WOMEN_BOTTOM_POCKET_OPTIONS,
  WOMEN_BUTTON_OPTIONS,
  WOMEN_KAMEEZ_POCKET_OPTIONS,
} from "../../constants";
import { useAdditionalCustomizationOptions } from "../../hooks/useAdditionalCustomizationOptions";
import { useCustomerManager } from "../../hooks/useCustomerManager";
import { useMeasurementManager } from "../../hooks/useMeasurementManager";
import { useAppNavigation } from "../../hooks/useNavigation";

type AdditionalCustomizationOptionsValues = {
  double: boolean;
  design: boolean;
  front_pocket: boolean;
  zip_hip: boolean;
  qaf: boolean;
  round_arm: boolean;
  stud: boolean;
  chak_strip: boolean;
  trouser_pocket: boolean;
  silk_thread: boolean;
  contrast_piping: boolean;
  shoulder_epaulette: boolean;
  net_insert: boolean;
  lace_trim: boolean;
  tassel_detail: boolean;
  neckline_type: string;
  salwar_type: string;
  buttons_type: string;
  kameez_pocket_options: string;
  salwar_pocket_options: string;
};

const validationSchema = Yup.object().shape({
  neckline_type: Yup.string().required("Select neckline type"),
  salwar_type: Yup.string().required("Select salwar type"),
  buttons_type: Yup.string().required("Select buttons type"),
  kameez_pocket_options: Yup.string().required("Select kameez pocket option"),
  salwar_pocket_options: Yup.string().required("Select salwar pocket option"),
});

type ParamList = {
  AdditionalCustomizationOptions: {
    customerId: string;
  };
};

const AdditionalCustomizationOptions = () => {
  const route =
    useRoute<RouteProp<ParamList, "AdditionalCustomizationOptions">>();
  const { navigate } = useAppNavigation();

  const { getCustomerById } = useCustomerManager();
  const { getMeasurementsForCustomer } = useMeasurementManager();

  const customer = getCustomerById(new BSON.ObjectId(route.params.customerId));

  const measurement = getMeasurementsForCustomer(
    new BSON.ObjectId(route.params.customerId)
  );

  const { createOption } = useAdditionalCustomizationOptions(measurement._id);

  const formik = useFormik<AdditionalCustomizationOptionsValues>({
    initialValues: {
      double: false,
      design: false,
      front_pocket: measurement.gender === "male" ? true : false,
      zip_hip: false,
      qaf: false,
      round_arm: false,
      stud: false,
      chak_strip: false,
      trouser_pocket: false,
      silk_thread: false,
      contrast_piping: false,
      shoulder_epaulette: false,

      net_insert: false,
      lace_trim: false,
      tassel_detail: false,

      neckline_type:
        measurement.gender === "male" ? "collar_gala" : "boat_neck",
      salwar_type:
        measurement.gender === "male" ? "simple_salwar" : "classic_salwar",
      buttons_type: "simple_button",
      kameez_pocket_options:
        measurement.gender === "male" ? "one_pocket" : "no_pocket",
      salwar_pocket_options: "no_pocket",
    },
    validationSchema,
    onSubmit: (values, formikHelpers) => {
      try {
        createOption(values);
        formikHelpers.resetForm();
        navigate("CustomerDetail", { customerId: route.params.customerId });
      } catch (error) {}
    },
    enableReinitialize: true,
  });

  const handleToggle = (key: string) => {
    formik.setFieldValue(
      key,
      !formik.values[key as keyof AdditionalCustomizationOptionsValues]
    );
  };

  const CUSTOMIZATIONS =
    measurement.gender === "male" ? MEN_CUSTOMIZATIONS : WOMEN_CUSTOMIZATIONS;

  const NECKLINE_OPTIONS =
    measurement.gender === "male"
      ? NECKLINE_OPTIONS_MEN
      : NECKLINE_OPTIONS_WOMEN;

  const SALWAR_OPTIONS =
    measurement.gender === "male" ? SALWAR_OPTIONS_MEN : SALWAR_OPTIONS_WOMEN;

  const BUTTON_OPTIONS =
    measurement.gender === "male" ? MEN_BUTTON_OPTIONS : WOMEN_BUTTON_OPTIONS;

  const KAMEEZ_POCKET_OPTIONS =
    measurement.gender === "male"
      ? MEN_KAMEEZ_POCKET_OPTIONS
      : WOMEN_KAMEEZ_POCKET_OPTIONS;

  const BOTTOM_POCKET_OPTIONS =
    measurement.gender === "male"
      ? MEN_BOTTOM_POCKET_OPTIONS
      : WOMEN_BOTTOM_POCKET_OPTIONS;

  return (
    <ScreenWrapper withScrollView contentContainerStyle={{ padding: 16 }}>
      {CUSTOMIZATIONS.map(({ key, label, description }) => (
        <List.Item
          key={key}
          titleStyle={{ fontWeight: "700" }}
          title={label}
          description={description}
          descriptionNumberOfLines={0}
          right={() => (
            <Switch
              onChange={() => handleToggle(key)}
              value={Boolean(
                formik.values[key as keyof AdditionalCustomizationOptionsValues]
              )}
            />
          )}
          style={{
            paddingRight: 0,
          }}
          contentStyle={{ paddingLeft: 0 }}
          containerStyle={{
            marginVertical: 0,
            alignItems: "center",
          }}
          onPress={() => handleToggle(key)}
        />
      ))}

      <OptionSelectionModal
        options={NECKLINE_OPTIONS.map((v) => ({
          id: v.key,
          title: v.label,
          description: v.description,
        }))}
        onSelect={([option]) => formik.setFieldValue("neckline_type", option)}
        selectedIds={
          formik.values.neckline_type ? [formik.values.neckline_type] : []
        }
        title="Gala (Neckline) Types"
      />

      <OptionSelectionModal
        options={SALWAR_OPTIONS.map((v) => ({
          id: v.key,
          title: v.label,
          description: v.description,
        }))}
        onSelect={([option]) => formik.setFieldValue("salwar_type", option)}
        selectedIds={
          formik.values.salwar_type ? [formik.values.salwar_type] : []
        }
        title="Salwar Types"
      />

      <OptionSelectionModal
        options={BUTTON_OPTIONS.map((v) => ({
          id: v.key,
          title: v.label,
          description: v.description,
        }))}
        onSelect={([option]) => formik.setFieldValue("buttons_type", option)}
        selectedIds={
          formik.values.buttons_type ? [formik.values.buttons_type] : []
        }
        title="Buttons Type"
      />

      <OptionSelectionModal
        options={KAMEEZ_POCKET_OPTIONS.map((v) => ({
          id: v.key,
          title: v.label,
          description: v.description,
        }))}
        onSelect={([option]) =>
          formik.setFieldValue("kameez_pocket_options", option)
        }
        selectedIds={
          formik.values.kameez_pocket_options
            ? [formik.values.kameez_pocket_options]
            : []
        }
        title="Kameez Pocket Option"
      />

      <OptionSelectionModal
        options={BOTTOM_POCKET_OPTIONS.map((v) => ({
          id: v.key,
          title: v.label,
          description: v.description,
        }))}
        onSelect={([option]) =>
          formik.setFieldValue("salwar_pocket_options", option)
        }
        selectedIds={
          formik.values.salwar_pocket_options
            ? [formik.values.salwar_pocket_options]
            : []
        }
        title="Salwar Pocket Option"
      />

      <Button mode="contained" onPress={() => formik.handleSubmit()}>
        Save
      </Button>
    </ScreenWrapper>
  );
};

export default AdditionalCustomizationOptions;

const styles = StyleSheet.create({});
