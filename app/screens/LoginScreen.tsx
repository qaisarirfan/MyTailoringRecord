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

import { AuthOperationName, useEmailPasswordAuth } from "@realm/react";
import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { colors } from "../styles/colors";

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.purple,
    borderRadius: 25,
    marginHorizontal: 10,
    paddingVertical: 14,
    width: 120,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttons: {
    flexDirection: "row",
    marginTop: 100,
  },
  container: {
    alignItems: "center",
    backgroundColor: colors.grayLight,
    flex: 1,
  },
  disabled: {
    opacity: 0.8,
  },
  error: {
    color: colors.grayDark,
    marginTop: 10,
    textAlign: "center",
  },
  form: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderColor: colors.grayMedium,
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 30,
    paddingVertical: 40,
    width: "85%",
  },
  input: {
    alignSelf: "stretch",
    backgroundColor: colors.grayLight,
    borderColor: colors.grayMedium,
    borderRadius: 5,
    borderWidth: 1,
    color: colors.grayDark,
    fontSize: 16,
    marginBottom: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  logo: {
    height: 150,
    marginBottom: 30,
    marginTop: 50,
  },
  title: {
    color: colors.black,
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 50,
    textAlign: "center",
  },
});

/**
 * Screen for registering and/or logging in to the App Services App.
 */
export function LoginScreen() {
  // Here we use the email/password auth hook, but you may also use
  // the `useAuth()` hook for all auth operations.
  const { logIn, register, result } = useEmailPasswordAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // To display an error message on the screen whenever an auth
  // operation returns an error, we first make sure the error is
  // coming from the auth operation used herein.
  const hadError =
    result.error?.operation === AuthOperationName.LogIn ||
    result.error?.operation === AuthOperationName.Register;

  // Automatically log in the user after successful registration.
  useEffect(() => {
    if (result.success && result.operation === AuthOperationName.Register) {
      logIn({ email, password });
    }
  }, [result, logIn, email, password]);

  return (
    <View style={styles.container}>
      <Image
        alt="Atlas App Services"
        resizeMode="contain"
        source={require("../assets/atlas-app-services.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>Atlas Device SDK for React Native</Text>
      <View style={styles.form}>
        <TextInput
          accessibilityLabel="Enter email"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor={colors.grayDark}
          style={styles.input}
          textContentType="emailAddress"
          value={email}
        />
        <TextInput
          accessibilityLabel="Enter password"
          autoComplete="password"
          onChangeText={setPassword}
          placeholder="Password"
          placeholderTextColor={colors.grayDark}
          secureTextEntry
          style={styles.input}
          textContentType="password"
          value={password}
        />
        {hadError && <Text style={styles.error}>{result.error?.message}</Text>}
        <View style={styles.buttons}>
          <Pressable
            disabled={result.pending}
            onPress={() => logIn({ email, password })}
            style={[styles.button, result.pending && styles.disabled]}
          >
            <Text style={styles.buttonText}>Log In</Text>
          </Pressable>
          <Pressable
            disabled={result.pending}
            onPress={() => register({ email, password })}
            style={[styles.button, result.pending && styles.disabled]}
          >
            <Text style={styles.buttonText}>Register</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
