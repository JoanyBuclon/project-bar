<script setup lang="ts">
import type { Task } from '~/types/Task'

const tasks = ref<Task[]>([
    {
        name: 'Task 1',
        completed: true
    },
    {
        name: 'Task 2',
        completed: false
    },
    {
        name: 'Task 3',
        completed: false
    }
])

const emit = defineEmits(['percentage'])

function calculatePercentage() {
    const completedTasks = tasks.value.filter(task => task.completed).length
    const percentage = Math.round((completedTasks / tasks.value.length) * 100)
    emit('percentage', percentage)
};

calculatePercentage();

// ADD TASK
const newTask = ref('')
function addTask() {
    tasks.value.push({ name: newTask.value, completed: false})
    newTask.value = ''
    calculatePercentage()
}

// DELETE TASK
function deleteTask(task: Task) {
    tasks.value = tasks.value.filter(t => t !== task)
    calculatePercentage()
}
</script>

<template>
    <div v-for="task in tasks" :key="task.name">
        <UCheckbox v-model="task.completed" :label="task.name" @change="calculatePercentage" />
        <button @click="deleteTask(task)">Delete</button>
    </div>

    <form @submit.prevent="addTask">
        <input v-model="newTask" required placeholder="task" />
        <button>Add Task</button>
    </form>
</template>
