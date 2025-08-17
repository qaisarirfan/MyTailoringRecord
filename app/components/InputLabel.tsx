import React from "react";
import { StyleSheet, View, StyleProp, ViewStyle } from "react-native";
import { useTheme, Text } from "react-native-paper";

interface InputLabelProps {
  label: string;
  isRequired?: boolean;
  style?: StyleProp<ViewStyle>;
}

const InputLabel: React.FC<InputLabelProps> = ({
  label,
  isRequired = false,
  style,
}) => {
  const theme = useTheme();

  return (
    <View style={[styles.container, style]}>
      <Text variant="labelLarge" style={[styles.label]}>
        {label}
      </Text>
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
    fontWeight: "600",
  },
  asterisk: {
    fontSize: 14,
    fontWeight: "600",
    paddingLeft: 4,
  },
});

export default InputLabel;
