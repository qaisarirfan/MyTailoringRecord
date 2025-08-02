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
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Linking,
  Alert,
} from "react-native";

import { colors } from "../styles/colors";

const styles = StyleSheet.create({
  content: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 50,
  },
  link: {
    color: colors.purple,
    fontWeight: "bold",
  },
  paragraph: {
    color: colors.black,
    fontSize: 17,
    lineHeight: 22,
    marginVertical: 10,
    textAlign: "center",
  },
});

/**
 * Information about this example app and the Atlas Device SDK for React Native.
 */
export function IntroText() {
  const handlePress = async (url: string) => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };

  return (
    <View style={styles.content}>
      <Text style={styles.paragraph}>
        Welcome to the Atlas Device SDK for React Native!
      </Text>
      <Text style={styles.paragraph}>
        Start by adding a task ☝ You can then update it by toggling its status,
        or remove it by hitting the "x" icon. If using Device Sync, watch the
        tasks sync across devices or to Atlas in real-time. To see what happens
        when you make changes while offline, toggle "Pause Sync".
      </Text>
      <Text style={styles.paragraph}>Learn more at:</Text>
      <Pressable
        accessibilityLabel="Open link"
        accessibilityHint="Opens a link to Atlas Device SDK in your browser"
        onPress={() =>
          handlePress("https://www.mongodb.com/docs/realm/sdk/react-native/")
        }
      >
        <Text style={[styles.paragraph, styles.link]}>
          Atlas Device SDK for React Native
        </Text>
      </Pressable>
      <Pressable
        accessibilityLabel="Open link"
        accessibilityHint="Opens a link to Atlas Device Sync in your browser"
        onPress={() =>
          handlePress("https://www.mongodb.com/atlas/app-services/device-sync")
        }
      >
        <Text style={[styles.paragraph, styles.link]}>Atlas Device Sync</Text>
      </Pressable>
    </View>
  );
}
