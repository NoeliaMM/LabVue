import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Task } from '../types'
import { addTaskToDb, deleteTaskDb, loadTasksFromBd,updateTaskCompletedDb } from '@/services/tasksServices';

const taskFactory = (value: string): Omit<Task,'id'> => ({
  timestamp: Date.now(),
  text: value,
  completed: false,
})

export const useTasksStore = defineStore('tasksStore', () => {
  const tasks = ref<Task[]>([])

  const loadTaskToVm = async () => {
    tasks.value = await loadTasksFromBd();;
  };

  const addTask = async (task: string) => {
    const taskData = taskFactory(task);
    const newTaskId = await addTaskToDb(taskData);
    tasks.value.push({id:newTaskId,...taskData});
  }

  const toggleCompleted = async (id: string) => {
    const task = tasks.value.find((item) => item.id === id)
    if (task) {

        await updateTaskCompletedDb(id,!task.completed);

         const index = findIndexTask(tasks.value,id)
        if (index !== -1) {
          tasks.value[index] = { ...task, completed: !task.completed }; 
        }
    }
  }

  const removeTask = async (id: string)=>{
    const index= findIndexTask(tasks.value,id)
    if(index !== -1){
      await deleteTaskDb(id);
      tasks.value.splice(index,1);
    }
  }
  return { tasks, addTask, toggleCompleted, removeTask, loadTaskToVm }
})

const findIndexTask =(tasks:Task[], id:string) =>{
  return tasks.findIndex((item) => item.id === id);
}
