import {
    getFirestore,
    collection,
    query,
    where,
    onSnapshot,
    doc,
    updateDoc,
    deleteDoc,
    addDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { app } from "./authService"; 

const db = getFirestore(app);

export const getTasks = (isCompleted, callback) => {
    try {
        const auth = getAuth();
        const userId = auth.currentUser?.uid;

        if (!userId) throw new Error("User not authenticated");

        const tasksQuery = query(
            collection(db, "tasks"),
            where("userId", "==", userId), 
            where("isCompleted", "==", isCompleted)
        );

        const unsubscribe = onSnapshot(tasksQuery, (querySnapshot) => {
            const tasks = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            callback(tasks);
        });

        return unsubscribe;
    } catch (error) {
    }
};

export const getCompletedTasks = (callback) => {
    try {
        const auth = getAuth();
        const userId = auth.currentUser?.uid;

        if (!userId) throw new Error("User not authenticated");

        const completedTasksQuery = query(
            collection(db, "tasks"),
            where("userId", "==", userId), 
            where("isCompleted", "==", true)
        );

        const unsubscribe = onSnapshot(completedTasksQuery, (snapshot) => {
            const tasks = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            callback(tasks);
        });

        return unsubscribe;
    } catch (error) {
    }
};

export const updateTask = async (taskId, updatedTask) => {
    try {
        const taskRef = doc(db, "tasks", taskId);
        await updateDoc(taskRef, updatedTask);
    } catch (error) {
    }
};

export const deleteTask = async (taskId) => {
    try {
        const taskRef = doc(db, "tasks", taskId);
        await deleteDoc(taskRef);
    } catch (error) {
    }
};

export const createTask = async (task) => {
    try {
        const auth = getAuth();
        const userId = auth.currentUser?.uid;

        if (!userId) throw new Error("User not authenticated");

        const taskWithUserId = {
            ...task,
            userId, 
        };

        await addDoc(collection(db, "tasks"), taskWithUserId);
        console.log("Task created successfully");
    } catch (error) {
    }
};
