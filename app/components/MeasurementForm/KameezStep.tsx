import { FormikProps } from "formik";
import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";

import renderInput from "./renderInput";
import { MeasurementFields } from "./types";

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
});

interface Props {
  formik: FormikProps<MeasurementFields>;
}

const KameezStep: FC<Props> = ({ formik }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Kameez</Text>
      {renderInput(
        formik,
        "Shoulder Width",
        "shoulder_width",
        "e.g., 18",
        true
      )}
      {renderInput(
        formik,
        "Neck Circumference",
        "neck_circumference",
        "e.g., 15.5",
        true
      )}
      {renderInput(
        formik,
        "Neck Depth (Front)",
        "neck_depth_front",
        "e.g., 3.5"
      )}
      {renderInput(formik, "Collar Size", "collar_size", "e.g., 1.5")}
      {renderInput(formik, "Neck Depth (Back)", "neck_depth_back", "e.g., 1.5")}
      {renderInput(formik, "Bicep", "bicep", "e.g., 12", true)}
      {renderInput(formik, "Armhole", "armhole", "e.g., 9.5", true)}
      {renderInput(formik, "Sleeve Length", "sleeve_length", "e.g., 24", true)}
      {renderInput(formik, "Cuff Width", "cuff_width", "e.g., 7")}
      {renderInput(formik, "Elbow", "elbow", "e.g., 7")}
      {renderInput(
        formik,
        formik.values.gender === "female" ? "Bust" : "Chest",
        formik.values.gender === "female" ? "bust" : "chest",
        "e.g., 36",
        true
      )}
      {formik.values.gender === "female" &&
        renderInput(formik, "Under Bust", "under_bust", "e.g., 30")}
      {formik.values.gender === "female" &&
        renderInput(
          formik,
          "Dart Length Front",
          "dart_length_front",
          "e.g., 30"
        )}
      {formik.values.gender === "female" &&
        renderInput(formik, "Dart Length Back", "dart_length_back", "e.g., 30")}

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
      {renderInput(formik, "Waist", "waist", "e.g., 30", true)}
      {renderInput(formik, "Hip", "hip", "e.g., 38", true)}
      {renderInput(formik, "Kameez Length", "kameez_length", "e.g., 40", true)}
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
      {renderInput(formik, "Slit Length", "side_slit_length", "e.g., 12")}
      {renderInput(formik, "Flare Width", "flare_width", "e.g., 12")}
      {formik.values.gender === "female" &&
        renderInput(formik, "Flare Length", "flare_length", "e.g., 12")}
      {renderInput(formik, "Cross Back", "cross_back", "e.g., 12")}
      {renderInput(formik, "Shoulder Slope", "shoulder_slope", "e.g., 12")}
    </View>
  );
};

export default KameezStep;
