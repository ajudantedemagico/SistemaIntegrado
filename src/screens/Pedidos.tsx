import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import db from '../database/db';
import NeumorphicView from '../components/NeumorphicView';
import { RootStackParamList } from '../app/index';

type PedidosScreenRouteProp = RouteProp<RootStackParamList, 'Pedidos'>;
type PedidosScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Pedidos'>;

interface Props {
  route: PedidosScreenRouteProp;
  navigation: PedidosScreenNavigationProp;
}

interface HistoricoPedido {
  id: number;
  userId: number;
  order_details: string;
  date: string;
}

export default function Pedidos({ route, navigation }: Props) {
  const { userId } = route.params;
  const [pedido, setPedido] = useState<string>('');
  const [historicoPedidos, setHistoricoPedidos] = useState<HistoricoPedido[]>([]);

  useEffect(() => {
    carregarPedidos();
  }, []);

  const carregarPedidos = () => {
    db.transaction((tx: any) => {
      tx.executeSql(
        'SELECT * FROM orders_history WHERE userId = ? ORDER BY id DESC',
        [userId],
        (_: any, { rows }: any) => {
          setHistoricoPedidos(rows._array);
        }
      );
    });
  };

  const adicionarPedido = () => {
    if (pedido.trim() === '') return;

    const dataAtual = new Date().toLocaleDateString('pt-BR');

    db.transaction((tx: any) => {
      tx.executeSql(
        'INSERT INTO orders_history (userId, order_details, date) VALUES (?, ?, ?)',
        [userId, pedido, dataAtual],
        () => {
          Alert.alert('Sucesso', 'Pedido registrado!');
          setPedido('');
          carregarPedidos();
        }
      );
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>← Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Meus Pedidos</Text>

      <NeumorphicView style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="O que deseja pedir/registrar?" value={pedido} onChangeText={setPedido} />
      </NeumorphicView>

      <TouchableOpacity onPress={adicionarPedido}>
        <NeumorphicView style={styles.button}>
          <Text style={styles.buttonText}>Adicionar Pedido</Text>
        </NeumorphicView>
      </TouchableOpacity>

      <Text style={styles.subtitle}>Histórico de Pedidos</Text>
      
      <FlatList
        data={historicoPedidos}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <NeumorphicView style={styles.orderCard}>
            <Text style={styles.orderText}>{item.order_details}</Text>
            <Text style={styles.orderDate}>{item.date}</Text>
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
  inputContainer: { height: 60, justifyContent: 'center', marginBottom: 20 },
  input: { paddingHorizontal: 20, fontSize: 16, color: '#4A5568', height: '100%' },
  button: { height: 60, justifyContent: 'center', alignItems: 'center', marginBottom: 30 },
  buttonText: { fontSize: 18, fontWeight: 'bold', color: '#4A5568' },
  subtitle: { fontSize: 18, fontWeight: 'bold', color: '#4A5568', marginBottom: 15 },
  orderCard: { padding: 15, marginBottom: 15 },
  orderText: { fontSize: 16, color: '#4A5568', fontWeight: '500' },
  orderDate: { fontSize: 12, color: '#A0AEC0', marginTop: 8, textAlign: 'right' }
});