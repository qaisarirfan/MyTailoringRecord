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

import { useApp, useAuth, useUser } from "@realm/react";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { TaskScreen } from "./TaskScreen";
import { OfflineModeButton } from "../components/OfflineModeButton";
import { useSyncConnection } from "../hooks/useSyncConnection";
import { colors } from "../styles/colors";

const styles = StyleSheet.create({
  authButton: {
    borderColor: colors.grayMedium,
    borderRadius: 25,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  authButtonText: {
    color: colors.grayDark,
    fontWeight: "bold",
  },
  container: {
    backgroundColor: colors.grayLight,
    borderBottomWidth: 1,
    borderColor: colors.grayMedium,
    flex: 1,
  },
  header: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderColor: colors.grayMedium,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    paddingVertical: 20,
  },
  info: {
    color: colors.grayDark,
    fontSize: 13,
  },
  title: {
    color: colors.grayDark,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  titleContainer: {
    borderColor: colors.purple,
    borderLeftWidth: 2,
    paddingLeft: 10,
  },
});
/**
 * Displays the list of tasks as well as buttons for performing
 * sync-related operations.
 *
 * @note
 * This screen is only meant to be used for the Device Sync enabled
 * part of the app (`AppSync.tsx`).
 */
export function TaskScreenSync() {
  const app = useApp();
  const user = useUser();
  const { logOut } = useAuth();
  const { isConnected, reconnect, disconnect } = useSyncConnection();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{user?.profile.email}</Text>
          <Text style={styles.info}>{`App ID: ${app.id}`}</Text>
        </View>
        <Pressable style={styles.authButton} onPress={logOut}>
          <Text style={styles.authButtonText}>Log Out</Text>
        </Pressable>
      </View>
      <TaskScreen userId={user.id} />
      <OfflineModeButton
        isConnected={isConnected}
        toggleOfflineMode={isConnected ? disconnect : reconnect}
      />
    </View>
  );
}
