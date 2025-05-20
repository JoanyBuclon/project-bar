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

    function checkEmpty(task: Task) {
        if (task.name.trim() === '') task.name = 'Task'
    }

    calculatePercentage()

    const newTask = ref('')
    const addError = ref('')
    function addTask() {
        if (newTask.value.trim() === '') {
            addError.value = 'Enter a valid name!'
            return
        }

        tasks.value.push({ name: newTask.value, completed: false})
        addError.value = ''
        newTask.value = ''
        calculatePercentage()
    }

    function deleteTask(task: Task) {
        tasks.value = tasks.value.filter(t => t !== task)
        calculatePercentage()
    }
</script>

<template>
    <div class="lg:p-6">
        <div class="flex flex-row p-2 group" v-for="task in tasks">
            <button class="lg:invisible lg:group-hover:visible" @click="deleteTask(task)">
                <Icon class="text-red-600 cursor-pointer items-center" name="fa6-regular:trash-can" size="16" />
            </button>
            <UCheckbox class="items-center transform lg:scale-120 px-2 lg:px-4" v-model="task.completed" @change="calculatePercentage" />
            <input v-model="task.name" class="text-lg lg:text-xl font-bold p-1 lg:p-2 focus:outline-none w-full" @change="checkEmpty(task)"/>
        </div>

        <div class="flex flex-row p-2 group" v-if="tasks.length === 0">
            <p class="text-lg lg:text-xl font-bold p-1 lg:p-2 focus:outline-none">Waiting for your first task!</p>
        </div>

        <form @submit.prevent="addTask">
            <input class="text-lg lg:text-xl font-bold p-1 lg:p-2 focus:outline-none" v-model="newTask" placeholder="Add a new task" />
            <p v-if="addError" class="lg:text-lg text-red-500">{{ addError }}</p>
        </form>
    </div>
</template>
