import { db } from "../firebase";
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import type { Task } from "../types";



export const loadTasksFromBd = async (): Promise<Task[]> => {
  const result = await getDocs(collection(db, "tasks"));
  return result.docs.map(doc => ({id: doc.id, ...doc.data()}) as Task);
};

export const addTaskToDb = async (taskData: Omit<Task, 'id'>): Promise<string> => {
  const result = await addDoc(collection(db, "tasks"), taskData);
  return result.id;
};

export const updateTaskCompletedDb = async (id: string, completed: boolean): Promise<void> => {
  await updateDoc(doc(db, "tasks", id), { completed });
};

export const deleteTaskDb = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, "tasks", id));
};
