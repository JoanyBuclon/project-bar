<script setup lang="ts">
  import type { SimpleProject } from '~/types/simple-project';

  const props = defineProps<{project: SimpleProject}>()
  const project = ref<SimpleProject>(props.project ?? {})

</script>


<template>
    <div class="border rounded-sm border-current hover:border-primary w-80 h-40 cursor-pointer">
      <div class="w-full h-full flex flex-col gap-4 p-1">
        <div class="flex flex-col gap-2 justify-center items-center h-2/3">
          <p>Project Name</p>
          <p>Progress: 100%</p>
        </div>
        <p class="flex justify-end items-end h-1/3">Last updated: 27/05/2025</p>
      </div>
    </div>
</template>