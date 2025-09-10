import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View, StyleSheet } from 'react-native';
import type { RemoteElement } from '../features/listado/types';

const URL = 'https://6172cfe5110a740017222e2b.mockapi.io/elements';

export default function ListadoScreen() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<RemoteElement[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch(URL);
        const json = await res.json();
        if (mounted) setData(json);
      } catch (e) {
        if (mounted) setError('No se pudo cargar el listado');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator testID="loading" />
        <Text>Cargando...</Text>
      </View>
    );
  }

  if (error) {
    return <View style={styles.center}><Text>{error}</Text></View>;
  }

  return (
    <FlatList
      testID="remote-list"
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.row}>
          <Text style={{ flex: 1 }}>{item.name}</Text>
          {item.avatar ? <Image source={{ uri: item.avatar }} style={styles.avatar} /> : null}
        </View>
      )}
      ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
      contentContainerStyle={{ padding: 16 }}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  row: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 40, height: 40, borderRadius: 20, marginLeft: 12 }
});
