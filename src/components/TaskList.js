import React from "react";
import { FlatList, StyleSheet } from "react-native";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onToggleCompletion, onEdit, onDelete, onViewDetails }) => (
    <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
            <TaskItem
                task={item}
                onToggleCompletion={onToggleCompletion}
                onEdit={() => onEdit(item)}
                onDelete={onDelete}
                onViewDetails={() => onViewDetails(item)}
            />
        )}
        contentContainerStyle={styles.listContainer}
    />
);


const styles = StyleSheet.create({
    listContainer: {
        paddingBottom: 20,
    },
});

export default TaskList;
