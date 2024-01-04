import {View, Text, Pressable, StyleSheet} from 'react-native';
import React, {memo} from 'react';
import type {Task} from '../models/Task';

type TaskItemProps = {
  task: Task;
  onToggle: (task: Task) => void;
  onDelete: (task: Task) => void;
};

export const TaskItem = memo<TaskItemProps>(({task, onToggle, onDelete}) => {
  return (
    <View style={[styles.task, task.completed && styles.taskCompleted]}>
      <Pressable
        accessibilityLabel={`Mark task as ${
          task.completed ? 'not done' : 'done'
        }`}
        onPress={() => onToggle(task)}
        style={[styles.status, task.completed && styles.statusCompleted]}>
        <Text style={styles.statusIcon}>{task.completed ? '✓' : '○'}</Text>
      </Pressable>
      <View style={styles.descriptionContainer}>
        <Text
          numberOfLines={1}
          style={[
            styles.description,
            task.completed && styles.descriptionCompleted,
          ]}>
          {task.description}
        </Text>
      </View>
      <Pressable
        accessibilityLabel="Delete task"
        onPress={() => onDelete(task)}
        style={styles.deleteButton}>
        <Text style={styles.deleteIcon}>x</Text>
      </Pressable>
    </View>
  );
});

export default TaskItem;
const styles = StyleSheet.create({
  task: {
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    backgroundColor: 'white',
  },
  taskCompleted: {
    borderColor: '#671ff7',
    backgroundColor: '#671ff7',
  },
  descriptionContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  description: {
    paddingHorizontal: 10,
    fontSize: 15,
    color: '#6e6969',
  },
  descriptionCompleted: {
    color: 'white',
  },
  status: {
    width: 50,
    height: '100%',
    justifyContent: 'center',
    borderRadius: 5,
    borderRightWidth: 1,
    borderColor: '#d3d3d3',
    backgroundColor: 'white',
  },
  statusCompleted: {
    borderColor: '#671ff7',
  },
  statusIcon: {
    textAlign: 'center',
    fontSize: 17,
    color: '#671ff7',
  },
  deleteButton: {
    width: 30,
    height: 30,
    marginRight: 10,
    justifyContent: 'center',
    borderWidth: 0.5,
    borderRadius: 30,
    borderColor: 'white',
    backgroundColor: 'red',
  },
  deleteIcon: {
    marginTop: -2,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 12,
    color: 'white',
  },
});
