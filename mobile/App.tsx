import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SingIn from './src/pages/SignIn';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#1D1D2E'  translucent={false}  />
      <SingIn/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
