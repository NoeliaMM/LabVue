<script setup lang="ts">
import { ref } from 'vue'

const taskInput = ref('')

const tasksStore = useTasksStore()

const addTask = () => {
  tasksStore.addTask(taskInput.value)
  taskInput.value = ''
}

import { useTasksStore } from '@/stores/tasksStore'
</script>

<template>
  <form class="w-full max-w-sm mx-auto px-4 py-2" @submit.prevent="addTask">
    <div class="flex items-center border-b-2 border-teal-500 py-2">
      <input
        v-model="taskInput"
        class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
        type="text"
        placeholder="Add a task"
      />
      <button
        class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
      >
        Add
      </button>
    </div>
  </form>
</template>
