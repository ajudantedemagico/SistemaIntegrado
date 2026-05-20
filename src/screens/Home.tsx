import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import NeumorphicView from '../components/NeumorphicView';
import { RootStackParamList } from '../app/index';

type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  route: HomeScreenRouteProp;
  navigation: HomeScreenNavigationProp;
}

export default function Home({ route, navigation }: Props) {
  const { username, userId } = route.params;

  const navigateTo = (screen: keyof RootStackParamList) => {
    // @ts-ignore - Ignorando validação estrita de params para simplificar roteamento dinâmico
    navigation.navigate(screen, { userId });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Olá, {username}</Text>
        <Text style={styles.subtitle}>O que vamos fazer hoje?</Text>
      </View>

      <View style={styles.grid}>
        <TouchableOpacity onPress={() => navigateTo('IMC')} style={styles.cardWrapper}>
          <NeumorphicView style={styles.card}>
            <Text style={styles.cardTitle}>IMC</Text>
            <Text style={styles.cardDesc}>Calculadora</Text>
          </NeumorphicView>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigateTo('Moedas')} style={styles.cardWrapper}>
          <NeumorphicView style={styles.card}>
            <Text style={styles.cardTitle}>Moedas</Text>
            <Text style={styles.cardDesc}>Conversor</Text>
          </NeumorphicView>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigateTo('Solar')} style={styles.cardWrapper}>
          <NeumorphicView style={styles.card}>
            <Text style={styles.cardTitle}>Sistema</Text>
            <Text style={styles.cardDesc}>Solar</Text>
          </NeumorphicView>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigateTo('Pedidos')} style={styles.cardWrapper}>
          <NeumorphicView style={styles.card}>
            <Text style={styles.cardTitle}>Pedidos</Text>
            <Text style={styles.cardDesc}>Histórico</Text>
          </NeumorphicView>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E0E5EC', padding: 20 },
  header: { marginTop: 40, marginBottom: 30, paddingHorizontal: 10 },
  greeting: { fontSize: 28, fontWeight: 'bold', color: '#4A5568' },
  subtitle: { fontSize: 16, color: '#718096', marginTop: 5 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  cardWrapper: { width: '45%', marginBottom: 20 },
  card: { height: 120, padding: 15, justifyContent: 'center', alignItems: 'center' },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#4A5568' },
  cardDesc: { fontSize: 12, color: '#A0AEC0', marginTop: 5 }
});