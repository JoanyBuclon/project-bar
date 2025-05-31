<script setup lang="ts">
    import type { SimpleProject } from '~/types/simple-project';

    const props = defineProps<{ projects: Array<SimpleProject> }>()
    const projects = ref<Array<SimpleProject>>(props.projects ?? new Array<SimpleProject>())

    function onOpenProject(id: string) {
      alert(id)
    }
</script>

<template>
  <header class="flex fixed top-0 right-0 p-8">
    <UModal fullscreen title="Project directory" description="Choose a project to open" close-icon="i-lucide-x">
      <UButton class="cursor-pointer" icon="i-lucide-menu" color="neutral" variant="outline" />
      <template #body>
        <div class="flex flex-row">
          <div class="basis-5/6 divide-default grid grid-cols-4 gap-9 overflow-auto max-h-220">
            <ProjectCard v-for="project in projects" :project="project" @id="onOpenProject"/>
          </div>
          <div class="grid basis-1/6 gap-3 justify-end content-start p-2">
            <UButton class="cursor-pointer" icon="i-lucide-plus">Add project</UButton>
            <UButton class="cursor-pointer" icon="i-lucide-arrow-up">Import project</UButton>
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