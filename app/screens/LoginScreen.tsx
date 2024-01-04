import React, {useEffect, useState} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {AuthOperationName, useEmailPasswordAuth} from '@realm/react';

export function LoginScreen() {
  const {logIn, register, result} = useEmailPasswordAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const hadError =
    result.error?.operation === AuthOperationName.LogIn ||
    result.error?.operation === AuthOperationName.Register;

  useEffect(() => {
    if (result.success && result.operation === AuthOperationName.Register) {
      logIn({email, password});
    }
  }, [result, logIn, email, password]);

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          accessibilityLabel="Enter email"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          onChangeText={setEmail}
          placeholder="Email"
          style={styles.input}
          value={email}
        />
        <TextInput
          accessibilityLabel="Enter password"
          autoComplete="password"
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          textContentType="password"
          value={password}
        />
        {hadError && <Text style={styles.error}>{result.error?.message}</Text>}
        <View style={styles.buttons}>
          <Pressable
            disabled={result.pending}
            onPress={() => logIn({email, password})}
            style={[styles.button, result.pending && styles.disabled]}>
            <Text style={styles.buttonText}>Log In</Text>
          </Pressable>
          <Pressable
            disabled={result.pending}
            onPress={() => register({email, password})}
            style={[styles.button, result.pending && styles.disabled]}>
            <Text style={styles.buttonText}>Register</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  logo: {
    height: 150,
    marginTop: 50,
    marginBottom: 30,
  },
  title: {
    marginBottom: 50,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333333',
  },
  form: {
    width: '85%',
    paddingHorizontal: 30,
    paddingVertical: 40,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#d3d3d3',
    backgroundColor: 'white',
  },
  input: {
    alignSelf: 'stretch',
    marginBottom: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#d3d3d3',
    backgroundColor: '#f5f5f5',
    fontSize: 16,
    color: '#6e6969',
  },
  error: {
    marginTop: 10,
    textAlign: 'center',
    color: '#6e6969',
  },
  buttons: {
    marginTop: 30,
    flexDirection: 'row',
  },
  button: {
    width: 120,
    marginHorizontal: 10,
    paddingVertical: 14,
    borderRadius: 25,
    backgroundColor: '#671ff7',
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
  },
  disabled: {
    opacity: 0.8,
  },
});
