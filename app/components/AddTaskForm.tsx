import {View, Text, TextInput, Pressable, StyleSheet} from 'react-native';
import React, {useState} from 'react';

type AddTaskFormProps = {
  onSubmit: (description: string) => void;
};
const AddTaskForm = ({onSubmit}: AddTaskFormProps) => {
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    onSubmit(description);
    setDescription('');
  };

  return (
    <View style={styles.form}>
      <TextInput
        placeholder="Add a new Task"
        onChangeText={setDescription}
        value={description}
        style={styles.textInput}
      />
      <Pressable onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.icon}>+</Text>
      </Pressable>
    </View>
  );
};

export default AddTaskForm;

const styles = StyleSheet.create({
  form: {
    height: 50,
    marginTop: 25,
    marginBottom: 20,
    flexDirection: 'row',
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginRight: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#d3d3d3',
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#6e6969',
  },
  submitButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: '#671ff7',
  },
  icon: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
  },
});
