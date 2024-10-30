import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ScrollView,
  TouchableOpacity,
} from "react-native";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [isCompleteCounter, setIsCompleteCounter] = useState(0);

  const handleAddTask = () => {
    if (task.trim() !== "") {
      const newTask = { id: Date.now(), text: task, isComplete: false }; //toda tarea se crea sin haberse completado, usé un id para poder ponerlo como key en el map
      setTasks([...tasks, newTask]);
      setTask("");
    }
  };

  const handleDeleteTask = (id) => {
    const deletedTask = tasks.find((tarea) => tarea.id === id);
    const resultTasks = tasks.filter((tarea) => tarea.id !== id);
    setTasks(resultTasks);

    if (deletedTask && deletedTask.isComplete) { //veo si la tarea que se elimina está completada
      setIsCompleteCounter((prevValue) => Math.max(prevValue - 1, 0)); // Esto es para que el contador no sea negativo
    }
  };

  const handleIsCompleted = (id) => {//Esta función permite manejar cuando una tarea se marca como hecha
    const completedTask = tasks.find((tarea) => tarea.id === id);
    if (completedTask) {
      const updatedTasks = tasks.filter((tarea) => tarea.id !== id); // Se elimina la tarea que esté completada
      setTasks(updatedTasks);
      setIsCompleteCounter((prevValue) => prevValue + 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ToDo List</Text>
      <StatusBar style="auto" />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setTask}
          value={task}
          placeholder="Escribe la tarea"
        />
        <Button onPress={handleAddTask} title="Agregar tarea" />
      </View>
      <Text style={styles.counter}>
        Tareas completadas: {isCompleteCounter}
      </Text>
      <ScrollView style={styles.tasksContainer}>
        {tasks.map((tarea) => (
          <View key={tarea.id} style={styles.task}>
            <Text>{tarea.text}</Text>
            <TouchableOpacity
              onPress={() => handleIsCompleted(tarea.id)}
              style={styles.completedTaskButton}
            >
              <Text>Hecha</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteTask(tarea.id)}
            >
              <Text>Eliminar tarea</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    width: "90%",
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  tasksContainer: {
    width: "90%",
    marginTop: 10,
  },
  task: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 10,
  },
  taskText: {
    fontSize: 16,
    flex: 1,
  },
  completedTaskButton: {
    backgroundColor: "#4cbc3d",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: "#ff6347",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});
