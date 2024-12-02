import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import SortOptions from "../components/SortOptions";
import ModalWrapper from "../components/ModalWrapper";
import useTasks from "../hooks/useTasks"; 

const HomeScreen = () => {
    const {
        tasks,
        title,
        setTitle,
        description,
        setDescription,
        dueDate,
        setDueDate,
        sortOption,
        setSortOption,
        modalVisible,
        setModalVisible,
        selectedTask,
        setSelectedTask,
        handleCreateTask,
        handleEditTask,
        handleToggleCompletion,
        handleDeleteTask,
    } = useTasks(); 

    const [showDatePicker, setShowDatePicker] = useState(false); 
    const [isEditing, setIsEditing] = useState(false);

    const resetFormFields = () => {
        setTitle("");
        setDescription("");
        setDueDate(new Date());
        setSelectedTask(null);
    };

    const openEditModal = (task) => {
        setIsEditing(true); 
        setSelectedTask(task);
        setTitle(task.title);
        setDescription(task.description);
        setDueDate(new Date(task.dueDate));
        setModalVisible(true);
    };

    const onViewDetails = (task) => {
        setIsEditing(false); 
        setSelectedTask(task);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        resetFormFields();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Create Your Tasks</Text>
            <TaskForm
                title={title}
                setTitle={setTitle}
                description={description}
                setDescription={setDescription}
                dueDate={dueDate}
                setDueDate={setDueDate}
                showDatePicker={showDatePicker}
                setShowDatePicker={setShowDatePicker}
                onSubmit={handleCreateTask}
                buttonText="Create Task"
            />

            <SortOptions sortOption={sortOption} setSortOption={setSortOption} />

            <TaskList
                tasks={tasks}
                onToggleCompletion={handleToggleCompletion}
                onEdit={openEditModal}
                onDelete={handleDeleteTask}
                onViewDetails={onViewDetails} 
            />

            <ModalWrapper visible={modalVisible} onClose={closeModal}>
                {isEditing ? (
                    <View>
                        <TaskForm
                            title={title}
                            setTitle={setTitle}
                            description={description}
                            setDescription={setDescription}
                            dueDate={dueDate}
                            setDueDate={setDueDate}
                            showDatePicker={showDatePicker}
                            setShowDatePicker={setShowDatePicker}
                            onSubmit={() => {
                                handleEditTask();
                                closeModal(); 
                            }}
                            buttonText="Save Changes"
                        />
                        <TouchableOpacity onPress={closeModal} style={styles.cancelButton}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View>
                        <Text style={styles.modalTitle}>{selectedTask?.title}</Text>
                        <Text style={styles.modalDescription}>{selectedTask?.description}</Text>
                        <Text style={styles.modalDate}>
                            Due: {new Date(selectedTask?.dueDate).toLocaleDateString()}
                        </Text>
                        <TouchableOpacity onPress={closeModal} style={styles.cancelButton}>
                            <Text style={styles.cancelText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ModalWrapper>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    cancelButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: "#f44336",
        borderRadius: 5,
        alignItems: "center",
    },
    cancelText: {
        color: "#fff",
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
    },
    modalDescription: {
        fontSize: 16,
        marginBottom: 10,
    },
    modalDate: {
        fontSize: 16,
        marginBottom: 20,
    },
});

export default HomeScreen;