import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import TaskItem from './TaskItem';
import {Task} from '../models/Task';

type TaskListProps = {
  tasks: Realm.Results<Task>;
  onToggle: (task: Task) => void;
  onDelete: (task: Task) => void;
};
export const TaskList = ({tasks, onToggle, onDelete}: TaskListProps) => {
  return (
    <View style={styles.listContainer}>
      <FlatList
        data={tasks}
        keyExtractor={task => task._id.toString()}
        renderItem={({item: task}) => (
          <TaskItem task={task} onToggle={onToggle} onDelete={onDelete} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
});
