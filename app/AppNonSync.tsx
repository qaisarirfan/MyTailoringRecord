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

import { RealmProvider } from "@realm/react";
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { PaperProvider } from "react-native-paper";

import { schemas } from "./models";
import Screens from "./screens";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

/**
 * The root React component for the local-only app which renders
 * `@realm/react`'s `RealmProvider` for opening a Realm.
 */
export function AppNonSync() {
  return (
    <PaperProvider>
      <SafeAreaView style={styles.screen}>
        <RealmProvider schema={schemas} schemaVersion={1}>
          <Screens />
        </RealmProvider>
      </SafeAreaView>
    </PaperProvider>
  );
}
