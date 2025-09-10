import { useState, useEffect } from 'react';
import { Modal, View, TextInput, Button, StyleSheet } from 'react-native';

type Props = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (description: string) => void;
};

export default function AddTaskModal({ visible, onClose, onSubmit }: Props) {
  const [value, setValue] = useState('');
  useEffect(() => { if (!visible) setValue(''); }, [visible]);

  const canSave = value.trim().length > 0;

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose} transparent>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <TextInput
            testID="task-input"
            placeholder="Descripción del task"
            value={value}
            onChangeText={setValue}
            style={styles.input}
          />
          <Button title="Guardar" onPress={() => { onSubmit(value); onClose(); }} disabled={!canSave} />
          <View style={{ height: 8 }} />
          <Button title="Cancelar" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: '#0006', justifyContent: 'center', padding: 16 },
  card: { backgroundColor: 'white', borderRadius: 12, padding: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 12 }
});
