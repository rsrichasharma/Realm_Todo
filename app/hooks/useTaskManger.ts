import {useCallback, useState} from 'react';

import {Task, RealmContext} from '../models/Task';
import {BSON} from 'realm';

const {useQuery, useRealm} = RealmContext;

export function useTaskManager(userId = 'SYNC_DISABLED') {
  const realm = useRealm();
  const [showCompleted, setShowCompleted] = useState(true);
  const tasks = useQuery(
    Task,
    collection =>
      showCompleted
        ? collection.sorted('createdAt')
        : collection.filtered('completed == false').sorted('createdAt'),
    [showCompleted],
  );

  const addTask = useCallback(
    (description: string) => {
      if (!description) {
        return;
      }
      realm.write(() => {
        realm.create('Task', {
          description,
          _id: new BSON.ObjectId(),
          completed: false,
          createdAt: new Date(),
          user: userId,
        });
      });
    },
    [realm, userId],
  );

  const toggleTaskStatus = useCallback(
    (task: Task) => {
      realm.write(() => {
        task.completed = !task.completed;
      });
    },
    [realm],
  );

  const deleteTask = useCallback(
    (task: Task) => {
      realm.write(() => {
        realm.delete(task);
      });
    },
    [realm],
  );

  const toggleShowCompleted = useCallback(() => {
    setShowCompleted(!showCompleted);
  }, [showCompleted]);

  return {
    tasks,
    addTask,
    toggleTaskStatus,
    deleteTask,
    showCompleted,
    toggleShowCompleted,
  };
}
