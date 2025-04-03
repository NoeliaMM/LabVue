<script setup lang="ts">
import { useTasksStore } from '@/stores/tasksStore'
import { onMounted } from 'vue';

const tasksStore = useTasksStore();

onMounted(async () => {
  await tasksStore.loadTaskToVm();
});

const completeTask = (id: string) => {
  tasksStore.toggleCompleted(id)
}

const removeTask = (id: string) => {

  tasksStore.removeTask(id)
}
</script>

<template>
  <ul class="divide-y divide-gray-200 px-4">
    <li class="py-4" v-for="task in tasksStore.tasks" :key="task.id">
      <form @submit.prevent>
        <div class="flex items-center justify-between">
          <input
            :id="`task-${task.id}`"
            type="checkbox"
            :checked="task.completed"
            @change="completeTask(task.id)"
            class="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
          />
          <label
            :for="`task-${task.id}`"
            class="ml-3 block text-gray-900 mr-auto"
            :class="{
              'line-through text-gray-400': task.completed,
            }"
          >
            <span class="text-lg font-medium">{{ task.text }}</span>
            <span class="text-sm font-light text-gray-500">date</span>
          </label>

          <button
            @click="removeTask(task.id)"
            class="focus:outline-none text-white bg-red-300 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Remove
          </button>
        </div>
      </form>
    </li>
  </ul>
</template>
