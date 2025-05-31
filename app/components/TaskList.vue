<script setup lang="ts">
    import type { Task } from '~/types/task'

    const props = defineProps<{ tasks: Array<Task> }>()
    const emit = defineEmits(['tasks'])

    function tasksChange() {
        emit('tasks', props.tasks)
    }

    tasksChange()

    const newTask = ref('')
    const addError = ref('')
    function addTask() {
        if (newTask.value.trim() === '') {
            addError.value = 'Enter a valid name!'
            return
        }

        props.tasks.push({ name: newTask.value, completed: false})
        addError.value = ''
        newTask.value = ''
        tasksChange()
    }

    function deleteTask(task: Task) {
        emit('tasks', props.tasks.filter(t => t !== task))
    }

    function onTaskNameChanged(task: Task) {
        if (task.name.trim() === '') task.name = 'Task'
        tasksChange()
    }
</script>

<template>
    <div class="lg:p-6 overflow-auto max-h-144">
        <div class="flex flex-row p-2 group" v-for="task in tasks">
            <button class="lg:invisible lg:group-hover:visible" @click="deleteTask(task)">
                <Icon class="text-red-600 cursor-pointer items-center" name="i-lucide-trash" size="16" />
            </button>
            <UCheckbox class="items-center transform lg:scale-120 px-2 lg:px-4" v-model="task.completed" @change="tasksChange" />
            <input v-model="task.name" class="text-lg lg:text-xl font-bold p-1 lg:p-2 focus:outline-none w-full" @change="onTaskNameChanged(task)"/>
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
