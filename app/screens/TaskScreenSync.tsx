import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useApp, useAuth, useUser} from '@realm/react';
import {TaskScreen} from './TaskScreen';

export function TaskScreenSync() {
  const app = useApp();
  const user = useUser();
  const {logOut} = useAuth();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{user?.profile.email}</Text>
          <Text style={styles.info}>{`App ID: ${app.id}`}</Text>
        </View>
        <Pressable style={styles.authButton} onPress={logOut}>
          <Text style={styles.authButtonText}>Log Out</Text>
        </Pressable>
      </View>
      <TaskScreen userId={user.id} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#d3d3d3',
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: '#d3d3d3',
    backgroundColor: 'white',
  },
  titleContainer: {
    paddingLeft: 10,
    borderLeftWidth: 2,
    borderColor: '#671ff7',
  },
  title: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6e6969',
  },
  info: {
    fontSize: 13,
    color: '#6e6969',
  },
  authButton: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: '#d3d3d3',
  },
  authButtonText: {
    fontWeight: 'bold',
    color: '#6e6969',
  },
});
