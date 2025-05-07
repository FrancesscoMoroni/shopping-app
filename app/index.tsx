import { View, Text, ScrollView } from "react-native";
import Header from "./components/Header";
import Main from "./components/Main";

import i18n from "i18next";
import languages from "./language/localizations.json";
import { initReactI18next } from "react-i18next";
import { getLocales } from "expo-localization";
import { StatusBar } from "expo-status-bar";

i18n.use(initReactI18next).init({
  resources: languages,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default function Index() {
  i18n.changeLanguage(getLocales()[0].languageCode ?? "en");

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#495E57",
      }}
    >
      <StatusBar translucent={true}></StatusBar>
      <Header />
      <Main />
    </View>
  );
}
