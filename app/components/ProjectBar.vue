<script setup lang="ts">
    import { onMounted } from 'vue'
    import type { SimpleProject } from '~/types/simple-project'
    import type { Task } from '~/types/task'

    const ready = ref<boolean>(false)
    const project = ref<SimpleProject>({
        id: Date.now().toString(),
        name: 'Project Name',
        type: 'simple-tasks',
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

    onMounted(() => {
        const savedProject = getProjects('projects')

        if (savedProject.length > 0 && savedProject[0])
            project.value = savedProject[0]

        ready.value = true
    })

    const completionPercent = ref(0)

    function onTasksChange(tasks: Task[]) {        
        const completedTasks = tasks.filter(task => task.completed).length
        completionPercent.value = Math.round((completedTasks / tasks.length) * 100)
        project.value.lastUpdate = new Date()
        project.value.tasks = tasks
        setProjects('projects', [project.value])
    }

    function onNameChanged() {
        if (project.value.name.trim() === '') project.value.name = 'Project Name'
        project.value.lastUpdate = new Date()
        setProjects('projects', [project.value])
    }
</script>

<template>
    <div class="flex items-center justify-center h-screen">
        <div class="flex flex-col gap-4 w-4/5 lg:w-2/5">
            <input v-model="project.name" class="text-xl lg:text-4xl font-bold text-center p-2 lg:p-6 focus:outline-none w-full" maxlength="50" @change="onNameChanged" />
            <UProgress v-model="completionPercent" color="primary" size="2xl" status />
            <TaskList v-if="ready" :tasks="project.tasks" @tasks="onTasksChange" />
            <div v-if="!ready">Loading project from storage...</div>
        </div>
    </div>
    <Footer />
</template>
