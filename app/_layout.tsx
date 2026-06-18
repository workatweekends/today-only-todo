import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppSettingsProvider } from '../contexts/AppSettingsContext';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <AppSettingsProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </AppSettingsProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
