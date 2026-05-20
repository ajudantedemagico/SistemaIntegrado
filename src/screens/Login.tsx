import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import db, { initDB } from '../database/db';
import NeumorphicView from '../components/NeumorphicView';
import { RootStackParamList } from '../app/index';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

export default function Login({ navigation }: Props) {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    initDB();
  }, []);

  const handleLogin = () => {
    db.transaction((tx: any) => {
      tx.executeSql(
        'SELECT * FROM users WHERE username = ? AND password = ?',
        [username, password],
        (_: any, { rows }: any) => {
          const result = rows;
          if (result.length > 0) {
            navigation.replace('Home', { userId: result._array[0].id, username });
          } else {
            Alert.alert('Erro', 'Credenciais inválidas!');
          }
        }
      );
    });
  };

  const handleRegister = () => {
    db.transaction((tx: any) => {
      tx.executeSql(
        'INSERT INTO users (username, password) VALUES (?, ?)',
        [username, password],
        () => Alert.alert('Sucesso', 'Conta criada! Faça login.'),
        (_: any, error: any) => {
          Alert.alert('Erro', 'Usuário já existe.');
          return false;
        }
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo</Text>
      
      <NeumorphicView style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Usuário" onChangeText={setUsername} value={username} />
      </NeumorphicView>

      <NeumorphicView style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Senha" secureTextEntry onChangeText={setPassword} value={password} />
      </NeumorphicView>

      <TouchableOpacity onPress={handleLogin} style={{ marginTop: 20 }}>
        <NeumorphicView style={styles.button}>
          <Text style={styles.buttonText}>Entrar</Text>
        </NeumorphicView>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleRegister} style={{ marginTop: 20 }}>
        <Text style={styles.registerText}>Criar nova conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E0E5EC', justifyContent: 'center', padding: 20 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#4A5568', textAlign: 'center', marginBottom: 40 },
  inputContainer: { marginBottom: 20, height: 60, justifyContent: 'center' },
  input: { paddingHorizontal: 20, fontSize: 16, color: '#4A5568', height: '100%' },
  button: { height: 60, justifyContent: 'center', alignItems: 'center' },
  buttonText: { fontSize: 18, fontWeight: 'bold', color: '#4A5568' },
  registerText: { textAlign: 'center', color: '#718096', marginTop: 10 }
});