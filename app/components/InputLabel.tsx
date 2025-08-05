import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";

interface InputLabelProps {
  label: string;
  isRequired?: boolean;
}

const InputLabel: React.FC<InputLabelProps> = ({
  label,
  isRequired = false,
}) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.label]}>{label}</Text>
      {isRequired && (
        <Text style={[styles.asterisk, { color: theme.colors.error }]}>*</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  asterisk: {
    fontSize: 14,
    fontWeight: "600",
    paddingLeft: 4,
  },
});

export default InputLabel;
