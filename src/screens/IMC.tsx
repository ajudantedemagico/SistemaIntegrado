import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import db from '../database/db';
import NeumorphicView from '../components/NeumorphicView';
import { RootStackParamList } from '../app/index';

type IMCScreenRouteProp = RouteProp<RootStackParamList, 'IMC'>;
type IMCScreenNavigationProp = StackNavigationProp<RootStackParamList, 'IMC'>;

interface Props {
  route: IMCScreenRouteProp;
  navigation: IMCScreenNavigationProp;
}

interface HistoricoIMC {
  id: number;
  userId: number;
  imc: number;
  date: string;
}

export default function IMC({ route, navigation }: Props) {
  const { userId } = route.params;
  const [peso, setPeso] = useState<string>('');
  const [altura, setAltura] = useState<string>('');
  const [historico, setHistorico] = useState<HistoricoIMC[]>([]);

  useEffect(() => {
    carregarHistorico();
  }, []);

  const carregarHistorico = () => {
    db.transaction((tx: any) => {
      tx.executeSql(
        'SELECT * FROM imc_history WHERE userId = ? ORDER BY id DESC',
        [userId],
        (_: any, { rows }: any) => {
          setHistorico(rows._array);
        }
      );
    });
  };

  const calcularIMC = () => {
    const p = parseFloat(peso);
    const a = parseFloat(altura);

    if (!p || !a) {
      Alert.alert('Erro', 'Preencha peso e altura corretamente.');
      return;
    }

    const imc = (p / (a * a)).toFixed(2);
    const dataAtual = new Date().toLocaleDateString('pt-BR');

    db.transaction((tx: any) => {
      tx.executeSql(
        'INSERT INTO imc_history (userId, imc, date) VALUES (?, ?, ?)',
        [userId, parseFloat(imc), dataAtual],
        () => {
          Alert.alert('Resultado', `Seu IMC é: ${imc}`);
          carregarHistorico();
          setPeso('');
          setAltura('');
        }
      );
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>← Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Calculadora de IMC</Text>

      <View style={styles.inputRow}>
        <NeumorphicView style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="Peso (kg)" keyboardType="numeric" value={peso} onChangeText={setPeso} />
        </NeumorphicView>
        <NeumorphicView style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="Altura (m)" keyboardType="numeric" value={altura} onChangeText={setAltura} />
        </NeumorphicView>
      </View>

      <TouchableOpacity onPress={calcularIMC}>
        <NeumorphicView style={styles.button}>
          <Text style={styles.buttonText}>Calcular e Salvar</Text>
        </NeumorphicView>
      </TouchableOpacity>

      <Text style={styles.subtitle}>Seu Histórico</Text>
      <FlatList
        data={historico}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <NeumorphicView style={styles.historyCard}>
            <Text style={styles.historyText}>Data: {item.date}</Text>
            <Text style={styles.historyImc}>IMC: {item.imc}</Text>
          </NeumorphicView>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E0E5EC', padding: 20, paddingTop: 40 },
  backButton: { marginBottom: 20 },
  backText: { color: '#718096', fontSize: 16 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#4A5568', marginBottom: 20 },
  inputRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  inputContainer: { flex: 0.48, height: 60, justifyContent: 'center' },
  input: { paddingHorizontal: 15, fontSize: 16, color: '#4A5568', height: '100%', textAlign: 'center' },
  button: { height: 60, justifyContent: 'center', alignItems: 'center', marginBottom: 30 },
  buttonText: { fontSize: 18, fontWeight: 'bold', color: '#4A5568' },
  subtitle: { fontSize: 18, fontWeight: 'bold', color: '#4A5568', marginBottom: 15 },
  historyCard: { padding: 15, marginBottom: 15, flexDirection: 'row', justifyContent: 'space-between' },
  historyText: { color: '#718096', fontSize: 16 },
  historyImc: { color: '#4A5568', fontSize: 16, fontWeight: 'bold' }
});