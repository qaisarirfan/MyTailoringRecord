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

import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { colors } from "../styles/colors";

type AddTaskFormProps = {
  onSubmit: (description: string) => void;
};

const styles = StyleSheet.create({
  form: {
    flexDirection: "row",
    height: 50,
    marginBottom: 20,
    marginTop: 25,
  },
  icon: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  submitButton: {
    backgroundColor: colors.purple,
    borderRadius: 50,
    height: 50,
    justifyContent: "center",
    width: 50,
  },
  textInput: {
    backgroundColor: colors.white,
    borderColor: colors.grayMedium,
    borderRadius: 5,
    borderWidth: 1,
    color: colors.grayDark,
    flex: 1,
    fontSize: 16,
    marginRight: 20,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
});

/**
 * Form for adding a new task.
 */
export function AddTaskForm({ onSubmit }: AddTaskFormProps) {
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    onSubmit(description);
    setDescription("");
  };

  return (
    <View style={styles.form}>
      <TextInput
        accessibilityLabel="Enter a task description"
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={setDescription}
        placeholder="Add a new task"
        placeholderTextColor={colors.grayDark}
        style={styles.textInput}
        value={description}
      />
      <Pressable
        accessibilityLabel="Add task"
        onPress={handleSubmit}
        style={styles.submitButton}
      >
        <Text style={styles.icon}>＋</Text>
      </Pressable>
    </View>
  );
}
