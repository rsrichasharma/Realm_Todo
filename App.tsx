import React from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet} from 'react-native';
import {OpenRealmBehaviorType} from 'realm';
import {AppProvider, UserProvider} from '@realm/react';

import {TaskScreenSync} from './app/screens/TaskScreenSync';
import {LoginScreen} from './app/screens/LoginScreen';
import {RealmContext, Task} from './app/models/Task';

const {RealmProvider} = RealmContext;
export function App() {
  const appId = 'application-0-hqpmb';
  console.log('app');
  return (
    <SafeAreaView style={styles.screen}>
      <AppProvider id={appId}>
        <UserProvider fallback={<LoginScreen />}>
          <RealmProvider
            fallback={<ActivityIndicator size={'large'} />}
            sync={{
              flexible: true,
              initialSubscriptions: {
                update: (mutableSubs, realm) =>
                  mutableSubs.add(realm.objects(Task), {name: 'myTasks'}),
              },
              newRealmFileBehavior: {
                type: OpenRealmBehaviorType.DownloadBeforeOpen,
              },
              existingRealmFileBehavior: {
                type: OpenRealmBehaviorType.OpenImmediately,
              },
            }}>
            <TaskScreenSync />
          </RealmProvider>
        </UserProvider>
      </AppProvider>
    </SafeAreaView>
  );
}

export default App;
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
});
