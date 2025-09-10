import { useState } from 'react';
import { View, FlatList, Text, Button, StyleSheet } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addTask } from '../features/tasks/tasksSlice';
import AddTaskModal from '../components/AddTaskModal';

export default function TasksScreen() {
  const tasks = useAppSelector(s => s.tasks.items);
  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.container}>
      <FlatList
        testID="tasks-list"
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={styles.item}>• {item.description}</Text>}
        ListEmptyComponent={<Text style={styles.empty}>No hay tasks</Text>}
      />
      <Button title="Agregar nuevo task" onPress={() => setVisible(true)} />
      <AddTaskModal
        visible={visible}
        onClose={() => setVisible(false)}
        onSubmit={(desc) => dispatch(addTask(desc))}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  item: { fontSize: 16, paddingVertical: 6 },
  empty: { color: '#777', textAlign: 'center', marginVertical: 24 }
});
