import { useState, useEffect } from "react";
import { createTask, getTasks, updateTask, deleteTask } from "../services/firestoreService";

const useTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState(new Date());
    const [sortOption, setSortOption] = useState("date");
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        const unsubscribe = getTasks(false, setTasks);
        return () => unsubscribe();
    }, []);

    const handleCreateTask = async () => {
        if (title && description && dueDate) {
            const newTask = {
                title,
                description,
                dueDate: dueDate.toISOString(),
                isCompleted: false,
            };
            await createTask(newTask);
            resetForm();
        }
    };

    const handleEditTask = async () => {
        if (selectedTask) {
            await updateTask(selectedTask.id, {
                title,
                description,
                dueDate: dueDate.toISOString(),
            });
            closeModal();
        }
    };

    const handleToggleCompletion = async (taskId, currentStatus) => {
        await updateTask(taskId, { isCompleted: !currentStatus });
    };

    const handleDeleteTask = async (taskId) => {
        await deleteTask(taskId);
    };

    const resetForm = () => {
        setTitle("");
        setDescription("");
        setDueDate(new Date());
    };

    const openModal = (task) => {
        console.log("Task clicked: ", task); 
        setSelectedTask(task);
        setTitle(task.title);
        setDescription(task.description);
        setDueDate(new Date(task.dueDate));
        setModalVisible(true); 
    };


    const closeModal = () => {
        setModalVisible(false);
        resetForm();
    };

    const sortedTasks = tasks.sort((a, b) =>
        sortOption === "date"
            ? new Date(a.dueDate) - new Date(b.dueDate)
            : a.title.localeCompare(b.title)
    );

    return {
        tasks: sortedTasks,
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
        openModal,
        closeModal,
    };
};

export default useTasks;
