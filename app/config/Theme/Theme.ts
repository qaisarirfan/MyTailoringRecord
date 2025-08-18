import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import deepmerge from "deepmerge";
import {
  MD3DarkTheme as PaperMD3DarkTheme,
  MD3LightTheme as PaperMD3LightTheme,
} from "react-native-paper";

const DarkTheme = deepmerge(PaperMD3DarkTheme, NavigationDarkTheme);
const LightTheme = deepmerge(PaperMD3LightTheme, NavigationDefaultTheme);

export { DarkTheme, LightTheme };
