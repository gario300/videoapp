import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';
import Main from './src';
import { PaperProvider, MD3DarkTheme } from 'react-native-paper';
import store from './src/app/store'
import { Provider } from 'react-redux'
import Snackbar from './src/components/SnackBar'
export default function App() {
  return (
    <Provider
      store={store}
    >
      <PaperProvider
        theme={MD3DarkTheme}
      >
        <SafeAreaView
          style={styles.container}
        >
          <Main/>
          <Snackbar/>
          <StatusBar style="auto" />
        </SafeAreaView>
      </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1F2E",
  }
})
