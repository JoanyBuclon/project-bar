<script setup lang="ts">
    import type { SimpleProject } from '~/types/simple-project'
    import type { Task } from '~/types/task'

    const project = ref<SimpleProject>({
        id: 'project',
        name: 'Project Name',
        lastUpdate: new Date(),
        tasks: [
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
        ]
    })

    const completionPercent = ref(0)

    function onTasksChange(tasks: Task[]) {
        const completedTasks = tasks.filter(task => task.completed).length
        completionPercent.value = Math.round((completedTasks / tasks.length) * 100)
    }

    function checkEmpty() {
        if (project.value.name.trim() === '') project.value.name = 'Project Name'
    }
</script>

<template>
    <div class="flex items-center justify-center h-screen">
        <div class="flex flex-col gap-4 w-3/5 lg:w-1/2">
            <input v-model="project.name" class="text-xl lg:text-4xl font-bold text-center p-2 lg:p-6 focus:outline-none w-full" maxlength="50" @change="checkEmpty" />
            <UProgress v-model="completionPercent" color="primary" size="2xl" status />
            <TaskList :tasks="project.tasks" @tasks="onTasksChange" />
        </div>
    </div>
    <Footer />
</template>
