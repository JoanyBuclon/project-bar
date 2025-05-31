<script setup lang="ts">
    import { onMounted } from 'vue'
    import { defaultSimpleProject, type SimpleProject } from '~/types/simple-project'
    import type { Task } from '~/types/task'

    const ready = ref<boolean>(false)
    const projectList = ref<Array<SimpleProject>>([])
    let project = reactive<SimpleProject>(defaultSimpleProject())

    onMounted(() => {
        loadLatestProject()
    })

    function loadLatestProject() {
        ready.value = false

        projectList.value = getProjects('projects')
        
        if (projectList.value.length > 0) {
            const latestProject = projectList.value.sort((a, b) => new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime())[0]

            if (latestProject)
                project = latestProject
        }

        ready.value = true
    }

    const completionPercent = ref(0)

    function onTasksChange(tasks: Task[]) {    
        if (!ready) return    
        calculatePercentage(tasks)
        project.lastUpdate = new Date()
        project.tasks = tasks
        setProjects('projects', [...projectList.value])
    }

    function onNameChanged() {
        if (!ready) return
        if (project.name.trim() === '') project.name = 'Project Name'
        project.lastUpdate = new Date()
        setProjects('projects', [...projectList.value])
    }

    function loadProjectById(id: string) {
        ready.value = false;

        projectList.value = getProjects('projects')
        const projectToLoad = projectList.value?.find(p => p.id === id)
        if (projectToLoad) 
            project = projectToLoad

        calculatePercentage(project.tasks)
        ready.value = true;
    }

    function deleteProjectById(id: string) {
        const projects = projectList.value.filter(p => p.id !== id)
        setProjects('projects', [...projects])
        loadLatestProject()
    }

    function calculatePercentage(tasks: Task[]) {
        const completedTasks = tasks.filter(task => task.completed).length
        completionPercent.value = Math.round((completedTasks / tasks.length) * 100)
    }
</script>

<template>
    <ProjectDirectory v-if="ready" @id="loadProjectById"/>
    <div class="flex items-center justify-center h-screen">
        <div class="flex flex-col gap-4 w-4/5 lg:w-2/5">
            <div class="flex items-start pl-8">
                <input v-model="project.name" class="text-xl lg:text-4xl font-bold text-center p-2 lg:p-6 focus:outline-none w-full" maxlength="35" @change="onNameChanged" />
                <ProjectSettings :project="project" @delete="deleteProjectById"/>
            </div>
            <UProgress v-model="completionPercent" color="primary" size="2xl" status />
            <TaskList v-if="ready" :tasks="project.tasks" @tasks="onTasksChange" />
            <div v-if="!ready">Loading projects from storage...</div>
        </div>
    </div>
    <Footer />
</template>
