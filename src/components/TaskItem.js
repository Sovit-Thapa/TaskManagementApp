import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const TaskItem = ({ task, onToggleCompletion, onEdit, onDelete, onViewDetails = () => {} }) => {
    const dueDate = new Date(task.dueDate);
    const formattedDate = dueDate instanceof Date && !isNaN(dueDate) ? dueDate.toLocaleDateString() : "Invalid Date";

    return (
        <View style={styles.taskItem}>
            <View style={styles.taskHeader}>
                <TouchableOpacity onPress={() => onToggleCompletion(task.id, task.isCompleted)}>
                    <Icon
                        name={task.isCompleted ? "check-square" : "square-o"}
                        size={24}
                        color={task.isCompleted ? "#4CAF50" : "#bbb"}
                    />
                </TouchableOpacity>
                <Text
                    style={[
                        styles.taskTitle,
                        task.isCompleted && styles.completedTitle,
                    ]}
                >
                    {task.title}
                </Text>
            </View>
            <Text style={styles.taskDate}>{formattedDate}</Text>
            <View style={styles.taskActions}>
                <TouchableOpacity onPress={onEdit}>
                    <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onDelete(task.id)}>
                    <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onViewDetails}>
                    <Text style={styles.viewDetailsText}>View Details</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    taskItem: {
        backgroundColor: "#f1f1f1",
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
    },
    taskHeader: {
        flexDirection: "row",
        alignItems: "center",
    },
    taskTitle: {
        fontSize: 18,
        color: "#333",
        marginLeft: 10,
    },
    completedTitle: {
        textDecorationLine: "line-through",
        color: "#999",
    },
    taskDate: {
        fontSize: 14,
        color: "#bbb",
        marginTop: 5,
    },
    taskActions: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    editText: {
        color: "#4CAF50",
    },
    deleteText: {
        color: "red",
    },
    viewDetailsText: {
        color: "#1E90FF",
    },
});

export default TaskItem;