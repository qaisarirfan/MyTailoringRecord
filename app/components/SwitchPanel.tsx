/// /////////////////////////////////////////////////////////////////////////
//
// Copyright 2023 Realm Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
/// /////////////////////////////////////////////////////////////////////////

import React from "react";
import { StyleSheet, Switch, Text, View } from "react-native";

import { colors } from "../styles/colors";

type SwitchPanelProps = {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
};

const styles = StyleSheet.create({
  label: {
    color: colors.grayDark,
    fontSize: 16,
    fontWeight: "bold",
  },
  panel: {
    alignItems: "center",
    borderColor: colors.grayMedium,
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
});

/**
 * A panel containing a switch toggle button.
 */
export function SwitchPanel({ label, value, onValueChange }: SwitchPanelProps) {
  return (
    <View style={styles.panel}>
      <Text style={styles.label}>{label}</Text>
      <Switch onValueChange={onValueChange} value={value} />
    </View>
  );
}
