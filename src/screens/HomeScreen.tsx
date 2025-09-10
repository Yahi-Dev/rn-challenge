import { View, Button, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../app/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Button title="Tasks" onPress={() => navigation.navigate('Tasks')} />
      <View style={{ height: 12 }} />
      <Button title="Listado" onPress={() => navigation.navigate('Listado')} />
    </View>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, justifyContent: 'center', padding: 16 }});
