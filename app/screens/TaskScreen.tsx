import {StyleSheet, Text, View} from 'react-native';
import {useTaskManager} from '../hooks/useTaskManger';
import AddTaskForm from '../components/AddTaskForm';
import {SwitchPanel} from '../components/SwitchPanel';
import {TaskList} from '../components/TaskList';

type TaskScreenProps = {
  userId?: string;
};
export function TaskScreen({userId}: TaskScreenProps) {
  const {
    tasks,
    addTask,
    toggleTaskStatus,
    deleteTask,
    showCompleted,
    toggleShowCompleted,
  } = useTaskManager(userId);
  console.log('taskscreen');
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <AddTaskForm onSubmit={addTask} />
        {tasks.length === 0 ? (
          <Text>Add tasks </Text>
        ) : (
          <TaskList
            tasks={tasks}
            onToggle={toggleTaskStatus}
            onDelete={deleteTask}
          />
        )}
      </View>
      <SwitchPanel
        label="Show Completed"
        value={showCompleted}
        onValueChange={toggleShowCompleted}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightGrey',
  },
  content: {
    flex: 1,
    paddingHorizontal: 25,
  },
});
