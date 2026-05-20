import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import NeumorphicView from '../../components/NeumorphicView';
import { RootStackParamList } from '../app/index';

type SolarScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Solar'>;

interface Props {
  navigation: SolarScreenNavigationProp;
}

interface Planeta {
  id: number;
  nome: string;
  desc: string;
}

export default function Solar({ navigation }: Props) {
  const planetas: Planeta[] = [
    { id: 1, nome: 'Mercúrio', desc: 'O menor e mais interno planeta.' },
    { id: 2, nome: 'Vênus', desc: 'O planeta mais quente do sistema.' },
    { id: 3, nome: 'Terra', desc: 'Nosso lar, o único com vida conhecida.' },
    { id: 4, nome: 'Marte', desc: 'O planeta vermelho, cheio de poeira.' },
    { id: 5, nome: 'Júpiter', desc: 'O gigante gasoso, maior de todos.' }
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>← Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Sistema Solar</Text>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {planetas.map(planeta => (
          <NeumorphicView key={planeta.id} style={styles.card}>
            <Text style={styles.planetName}>{planeta.nome}</Text>
            <Text style={styles.planetDesc}>{planeta.desc}</Text>
          </NeumorphicView>
        ))}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E0E5EC', padding: 20, paddingTop: 40 },
  backButton: { marginBottom: 20 },
  backText: { color: '#718096', fontSize: 16 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#4A5568', marginBottom: 20 },
  card: { padding: 20, marginBottom: 20 },
  planetName: { fontSize: 20, fontWeight: 'bold', color: '#4A5568', marginBottom: 5 },
  planetDesc: { fontSize: 14, color: '#718096' }
});