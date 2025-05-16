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
    }

    calculatePercentage()

    const newTask = ref('')
    function addTask() {
        tasks.value.push({ name: newTask.value, completed: false})
        newTask.value = ''
        calculatePercentage()
    }

    function deleteTask(task: Task) {
        tasks.value = tasks.value.filter(t => t !== task)
        calculatePercentage()
    }

    const active = ref<string>('')
    function displayDelete(name: string) {
        active.value = name
    }
</script>

<template>
    <div class="lg:p-6">
        <div class="flex flex-row p-2" v-for="task in tasks" @focusin="displayDelete(task.name)" @focusout="displayDelete('')" @mouseenter="displayDelete(task.name)" @mouseleave="displayDelete('')">
            <button :class="active === task.name ? 'visible' : 'invisible'" @click="deleteTask(task)"><Icon class="text-red-600 cursor-pointer items-center" name="fa6-regular:trash-can" size="16" /></button>
            <UCheckbox class="items-center transform lg:scale-120 px-2 lg:px-4" v-model="task.completed" @change="calculatePercentage" />
            <input v-model="task.name" class="text-lg lg:text-xl font-bold p-1 lg:p-2 focus:outline-none" />
        </div>

        <form @submit.prevent="addTask">
            <input class="text-lg lg:text-xl font-bold p-1 lg:p-2 focus:outline-none" v-model="newTask" required placeholder="Add a new task" />
        </form>
    </div>
</template>
