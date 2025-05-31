<script setup lang="ts">
    import { defaultSimpleProject, type SimpleProject } from '~/types/simple-project';

    const projectList = ref<Array<SimpleProject>>([])
    const open = ref(false)

    onMounted(() => {
      loadProjects()
    })

    function loadProjects() {
      const projects = getProjects('projects')
      projectList.value = projects.sort((a, b) => new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime())

    }

    const emit = defineEmits(['id'])
    function onOpenProject(id: string) {
      emit('id', id)
      open.value = false
    }

    function onCreateProject() {
      createProject(defaultSimpleProject())
    }

    function createProject(project: SimpleProject) {
      const exist = projectList.value.some(p => p.id === project.id)

      let projects = projectList.value
      if (exist) {
        projects = projectList.value.filter(p => p.id !== project.id)
      }

      const updatedProjects = [...projects, project]
      setProjects('projects', updatedProjects)
      onOpenProject(project.id)
    }
</script>

<template>
  <header class="flex fixed top-0 right-0 p-8">
    <UModal v-model:open="open" fullscreen title="Project directory" description="Choose a project to open" close-icon="i-lucide-x" @update:open="loadProjects()">
      <UButton class="cursor-pointer" icon="i-lucide-menu" color="neutral" variant="outline" />
      <template #body>
        <div class="flex flex-row">
          <div class="basis-5/6 grid grid-cols-1 lg:[grid-template-columns:repeat(auto-fill,minmax(320px,1fr))] gap-5">
            <ProjectCard v-for="project in projectList" :project="project" @id="onOpenProject"/>
          </div>
          <div class="grid basis-1/6 gap-3 justify-end content-start p-2">
            <UButton class="cursor-pointer" icon="i-lucide-plus" @click="onCreateProject">Add project</UButton>
            <Import :projects="projectList" @import="createProject"/>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="flex gap-1.5 justify-end w-full">
          <UButton icon="i-lucide-github" to="https://github.com/JoanyBuclon/project-bar" target="_blank">Github</UButton>
          <UButton icon="i-lucide-trello" to="https://trello.com/b/hRjd7xWq/projectbar" target="_blank">Roadmap</UButton>
        </div>
      </template>
    </UModal>
  </header>
</template>