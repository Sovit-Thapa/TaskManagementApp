import React from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const TaskForm = ({
    title,
    setTitle,
    description,
    setDescription,
    dueDate,
    setDueDate,
    showDatePicker,
    setShowDatePicker,
    onSubmit,
    buttonText,
}) => (
    <View>
        <TextInput
            placeholder="Task Title"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
        />
        <TextInput
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            style={[styles.input, styles.descriptionInput]}
            multiline={true}
        />
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePicker}>
            <Text style={styles.datePickerText}>{dueDate.toLocaleDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
            <DateTimePicker
                value={dueDate}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate) setDueDate(selectedDate);
                }}
            />
        )}
        <TouchableOpacity onPress={onSubmit} style={styles.createButton}>
            <Text style={styles.createButtonText}>{buttonText}</Text>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
        borderRadius: 5,
    },
    descriptionInput: {
        height: 80,
        textAlignVertical: "top",
    },
    datePicker: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: "#f1f1f1",
        borderRadius: 5,
        alignItems: "center",
    },
    datePickerText: {
        fontSize: 16,
        color: "#333",
    },
    createButton: {
        backgroundColor: "#4CAF50",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    createButtonText: {
        color: "#fff",
        fontSize: 16,
    },
});

export default TaskForm;
