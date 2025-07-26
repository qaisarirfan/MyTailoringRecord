import React, { StrictMode, useEffect } from "react";
import { PaperProvider } from "react-native-paper";
import { Platform, StatusBar } from "react-native";
import Screens from "./src/screens";

const App: React.FC = () => {
  return (
    <StrictMode>
      <PaperProvider settings={{ rippleEffectEnabled: true }}>
        <StatusBar
          barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
          backgroundColor={Platform.OS === "android" ? "#000000" : undefined}
          translucent={false}
          animated
          hidden={false}
        />
        <Screens />
      </PaperProvider>
    </StrictMode>
  );
};

export default App;
