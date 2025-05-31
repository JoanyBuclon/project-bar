<script setup lang="ts">
  import type { SimpleProject } from '~/types/simple-project';

  const props = defineProps<{project: SimpleProject}>()
  const completionPercent = ref(0)

  const emit = defineEmits(['id'])

  function onClick() {
    emit('id', props.project.id)
  }

  function formatDate(date: Date) {
    const dateObject = new Date(date)
    const day = String(dateObject.getDate()).padStart(2, '0')
    const month = String(dateObject.getMonth() + 1).padStart(2, '0')
    const year = dateObject.getFullYear()

    const hour = String(dateObject.getHours()).padStart(2, '0')
    const minute = String(dateObject.getMinutes()).padStart(2, '0')

    return `${hour}:${minute} - ${day}/${month}/${year}`
  }

  function calculatePercentage() {
    const tasks = props.project.tasks
    const completedTasks = tasks.filter(task => task.completed).length
    completionPercent.value = Math.round((completedTasks / tasks.length) * 100)
  }

  calculatePercentage()
</script>

<template>
    <div class="border border-dashed rounded-sm border-current hover:border-primary w-80 h-40 cursor-pointer" @click="onClick">
      <div class="w-full h-full flex flex-col gap-4 p-1">
        <div class="flex flex-col gap-2 justify-center items-center h-2/3">
          <p class="font-bold">{{ project.name }}</p>
          <div class="w-2/3">
            <UProgress v-model="completionPercent" color="primary" status />
          </div>
        </div>
        <p class="flex justify-end items-end h-1/3 text-sm italic">Last open: {{ formatDate(project.lastUpdate) }}</p>
      </div>
    </div>
</template>