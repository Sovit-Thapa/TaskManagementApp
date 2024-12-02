import React from "react";
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import useCompletedTasks from "../hooks/useCompletedTasks";

const CompletedTasksScreen = () => {
  const { completedTasks, toggleCompletion, deleteTaskById } = useCompletedTasks();

  return (
    <View style={styles.container}>
      <FlatList
        data={completedTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <TouchableOpacity
              onPress={() => toggleCompletion(item.id, item.isCompleted)}
              style={styles.checkbox}
            >
              <Icon
                name={item.isCompleted ? "check-square" : "square-o"}
                size={24}
                color={item.isCompleted ? "#4CAF50" : "#bbb"}
              />
            </TouchableOpacity>
            <Text style={[styles.taskTitle, item.isCompleted && styles.completed]}>
              {item.title}
            </Text>
            <TouchableOpacity onPress={() => deleteTaskById(item.id)}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  checkbox: {
    marginRight: 15,
  },
  taskTitle: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  completed: {
    textDecorationLine: "line-through",
    color: "#bbb",
  },
  deleteText: {
    color: "red",
    fontSize: 14,
  },
});

export default CompletedTasksScreen;
