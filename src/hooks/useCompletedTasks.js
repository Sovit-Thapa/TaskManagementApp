import { useState, useEffect } from "react";
import { getCompletedTasks, updateTask, deleteTask } from "../services/firestoreService";

const useCompletedTasks = () => {
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    const unsubscribe = getCompletedTasks((tasks) => {
      setCompletedTasks(tasks);
    });

    return () => {
      unsubscribe(); 
    };
  }, []);

  const toggleCompletion = async (taskId, currentStatus) => {
    const updatedStatus = !currentStatus;

    setCompletedTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, isCompleted: updatedStatus } : task
      )
    );

    await updateTask(taskId, { isCompleted: updatedStatus });
  };

  const deleteTaskById = async (taskId) => {
    await deleteTask(taskId);

    setCompletedTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return {
    completedTasks,
    toggleCompletion,
    deleteTaskById,
  };
};

export default useCompletedTasks;
