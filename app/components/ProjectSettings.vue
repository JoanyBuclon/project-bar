<script setup lang="ts">
      import type { SimpleProject } from '~/types/simple-project';

    const props = defineProps<{project: SimpleProject}>()
    const project = ref<SimpleProject>(props.project ?? {})

    const isExporting = ref<boolean>(false)
    const isSuccessful = ref<boolean>(false)
    function Export() {
        isExporting.value = true
        isSuccessful.value = false

        const jsonContent = JSON.stringify(project.value, null, 2)
        const blob = new Blob([jsonContent], { type: 'application/json' })
        const url = URL.createObjectURL(blob)

        const link = document.createElement('a')
        link.href = url
        link.download = project.value.name + '.json'
        document.body.appendChild(link)
        link.click()

        document.body.removeChild(link)
        URL.revokeObjectURL(url)
        isExporting.value = false
        isSuccessful.value = true
    }
</script>

<template>
    <UModal title="Project settings" close-icon="i-lucide-x">
      <UButton class="cursor-pointer" icon="i-lucide-settings" color="neutral" variant="outline" />
      <template #body>
        <div class="flex items-center gap-3">
            <UButton class="cursor-pointer" icon="i-lucide-arrow-down" color="info" @click="Export" :loading="isExporting" >Export project</UButton>
            <p v-if="isSuccessful" class="text-primary">Download successful!</p>
        </div>
      </template>
    </UModal>
</template>