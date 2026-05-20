import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../app/index';
import NeumorphicView from '../components/NeumorphicView';

type MoedasScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Moedas'>;

interface Props {
  navigation: MoedasScreenNavigationProp;
}

interface ResultadoMoedas {
  USD: string;
  EUR: string;
}

export default function Moedas({ navigation }: Props) {
  const [valorReal, setValorReal] = useState<string>('');
  const [resultado, setResultado] = useState<ResultadoMoedas | null>(null);

  const taxas = { USD: 5.10, EUR: 5.50 };

  const converter = () => {
    const valor = parseFloat(valorReal);
    if (!valor) return;

    setResultado({
      USD: (valor / taxas.USD).toFixed(2),
      EUR: (valor / taxas.EUR).toFixed(2)
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>← Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Conversor de Moedas</Text>
      <Text style={styles.desc}>Converter de Real (BRL)</Text>

      <NeumorphicView style={styles.inputContainer}>
        <TextInput 
          style={styles.input} 
          placeholder="R$ 0,00" 
          keyboardType="numeric" 
          value={valorReal} 
          onChangeText={setValorReal} 
        />
      </NeumorphicView>

      <TouchableOpacity onPress={converter} style={{ marginBottom: 30 }}>
        <NeumorphicView style={styles.button}>
          <Text style={styles.buttonText}>Converter</Text>
        </NeumorphicView>
      </TouchableOpacity>

      {resultado && (
        <View style={styles.resultBox}>
          <NeumorphicView style={styles.resultCard}>
            <Text style={styles.currencyName}>Dólar (USD)</Text>
            <Text style={styles.currencyValue}>$ {resultado.USD}</Text>
          </NeumorphicView>

          <NeumorphicView style={[styles.resultCard, { marginTop: 20 }]}>
            <Text style={styles.currencyName}>Euro (EUR)</Text>
            <Text style={styles.currencyValue}>€ {resultado.EUR}</Text>
          </NeumorphicView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E0E5EC', padding: 20, paddingTop: 40 },
  backButton: { marginBottom: 20 },
  backText: { color: '#718096', fontSize: 16 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#4A5568' },
  desc: { color: '#718096', marginBottom: 20 },
  inputContainer: { height: 60, justifyContent: 'center', marginBottom: 20 },
  input: { paddingHorizontal: 20, fontSize: 18, color: '#4A5568', height: '100%', textAlign: 'center' },
  button: { height: 60, justifyContent: 'center', alignItems: 'center' },
  buttonText: { fontSize: 18, fontWeight: 'bold', color: '#4A5568' },
  resultBox: { marginTop: 10 },
  resultCard: { padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  currencyName: { fontSize: 18, color: '#718096' },
  currencyValue: { fontSize: 22, fontWeight: 'bold', color: '#4A5568' }
});