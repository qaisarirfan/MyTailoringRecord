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

import React, { memo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "../styles/colors";

import type { Task } from "../models/Task";

type TaskItemProps = {
  task: Task;
  onToggleStatus: (task: Task) => void;
  onDelete: (task: Task) => void;
};

const styles = StyleSheet.create({
  deleteButton: {
    backgroundColor: colors.red,
    borderColor: colors.white,
    borderRadius: 30,
    borderWidth: 0.5,
    height: 30,
    justifyContent: "center",
    marginRight: 10,
    width: 30,
  },
  deleteIcon: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "bold",
    marginTop: -2,
    textAlign: "center",
  },
  description: {
    color: colors.grayDark,
    fontSize: 15,
    paddingHorizontal: 10,
  },
  descriptionCompleted: {
    color: colors.white,
  },
  descriptionContainer: {
    flex: 1,
    justifyContent: "center",
  },
  status: {
    backgroundColor: colors.white,
    borderColor: colors.grayMedium,
    borderRadius: 5,
    borderRightWidth: 1,
    height: "100%",
    justifyContent: "center",
    width: 50,
  },
  statusCompleted: {
    borderColor: colors.purple,
  },
  statusIcon: {
    color: colors.purple,
    fontSize: 17,
    textAlign: "center",
  },
  task: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderColor: colors.grayMedium,
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: "row",
    height: 55,
    marginVertical: 10,
  },
  taskCompleted: {
    backgroundColor: colors.purple,
    borderColor: colors.purple,
  },
});

/**
 * Displays a task list item with options to update or delete it.
 */
export const TaskItem = memo<TaskItemProps>(
  ({ task, onToggleStatus, onDelete }) => {
    return (
      <View style={[styles.task, task.isComplete && styles.taskCompleted]}>
        <Pressable
          accessibilityLabel={`Mark task as ${
            task.isComplete ? "not done" : "done"
          }`}
          onPress={() => onToggleStatus(task)}
          style={[styles.status, task.isComplete && styles.statusCompleted]}
        >
          <Text style={styles.statusIcon}>{task.isComplete ? "✓" : "○"}</Text>
        </Pressable>
        <View style={styles.descriptionContainer}>
          <Text
            numberOfLines={1}
            style={[
              styles.description,
              task.isComplete && styles.descriptionCompleted,
            ]}
          >
            {task.description}
          </Text>
        </View>
        <Pressable
          accessibilityLabel="Delete task"
          onPress={() => onDelete(task)}
          style={styles.deleteButton}
        >
          <Text style={styles.deleteIcon}>x</Text>
        </Pressable>
      </View>
    );
  }
);
