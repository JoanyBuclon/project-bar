<script setup lang="ts">
    import { onMounted } from 'vue'
    import type { SimpleProject } from '~/types/simple-project'
    import type { Task } from '~/types/task'

    const ready = ref<boolean>(false)
    const projectList = ref<Array<SimpleProject>>([])
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
        projectList.value = getProjects('projects')

        
        if (projectList.value.length > 0) {
            const latestProject = projectList.value.sort((a, b) => b.lastUpdate.getTime() - a.lastUpdate.getTime())[0]

            if (latestProject)
                project.value = latestProject
        }

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

    function loadProjectById(id: string) {
        ready.value = false;
        const projectToLoad = projectList.value?.find(p => p.id === id)
        if (projectToLoad)
            project.value = projectToLoad

        ready.value = true;
    }
</script>

<template>
    <ProjectDirectory v-if="ready" :projects="projectList" />
    <div class="flex items-center justify-center h-screen">
        <div class="flex flex-col gap-4 w-4/5 lg:w-2/5">
            <div class="flex items-start pl-8">
                <input v-model="project.name" class="text-xl lg:text-4xl font-bold text-center p-2 lg:p-6 focus:outline-none w-full" maxlength="35" @change="onNameChanged" />
                <ProjectSettings :project="project"/>
            </div>
            <UProgress v-model="completionPercent" color="primary" size="2xl" status />
            <TaskList v-if="ready" :tasks="project.tasks" @tasks="onTasksChange" />
            <div v-if="!ready">Loading projects from storage...</div>
        </div>
    </div>
    <Footer />
</template>
