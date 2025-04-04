import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Task } from '../types'

//Comentar o descomentar segun el servicio que se queira usar indexDb o fireabase
// Para usar firebase configurar el firebase.ts y el .env
  // import {taskService } from '@/services/firebase/tasksServices';
 import {taskService} from '@/services/indexDb/tasksService';

const taskFactory = (value: string): Omit<Task,'id'> => ({
  timestamp: Date.now(),
  text: value,
  completed: false,
})

export const useTasksStore = defineStore('tasksStore', () => {
  const tasks = ref<Task[]>([])

  const loadTaskToVm = async () => {
    tasks.value = (await taskService.loadTasksFromBd()) as Task[];
  };

  const addTask = async (task: string) => {
    const taskData = taskFactory(task);
    const newTask = await taskService.addTaskToDb(taskData) as Task;
    tasks.value.push({ ...newTask});
  }

  const toggleCompleted = async (id: string) => {
    const task = tasks.value.find((item) => item.id === id)
    if (task) {
      const updatedCompleted = !task.completed;
      await taskService.updateTaskCompletedDb({ ...task, completed: updatedCompleted });

      const index = findIndexTask(tasks.value, id);
      if (index !== -1) {
        tasks.value[index] = { ...task, completed: updatedCompleted };
      }
    }
  }

  const removeTask = async (id:string)=>{

    const index= findIndexTask(tasks.value,id)
    if(index !== -1){
      await taskService.deleteTaskDb(id);
      tasks.value.splice(index,1);
    }
  }

  return { tasks, addTask, toggleCompleted, removeTask, loadTaskToVm }
})

const findIndexTask =(tasks:Task[], id:string) =>{
  return tasks.findIndex((task => task.id === id));
}
