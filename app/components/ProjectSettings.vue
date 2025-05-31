<script setup lang="ts">
    import type { SimpleProject } from '~/types/simple-project';
    const props = defineProps<{project: SimpleProject}>()
    const open = ref(false)
    const emit = defineEmits(['delete'])
      
    const isExporting = ref<boolean>(false)
    const isDeleting = ref<boolean>(false)
    const isSuccessful = ref<boolean>(false)
    function Export() {
        isExporting.value = true
        isSuccessful.value = false

        const jsonContent = JSON.stringify(props.project, null, 2)
        const blob = new Blob([jsonContent], { type: 'application/json' })
        const url = URL.createObjectURL(blob)

        const link = document.createElement('a')
        link.href = url
        link.download = props.project.name + '.json'
        document.body.appendChild(link)
        link.click()

        document.body.removeChild(link)
        URL.revokeObjectURL(url)
        isExporting.value = false
        isSuccessful.value = true
    }

    function Delete() {
      isDeleting.value = true

      emit('delete', props.project.id)
      isDeleting.value = false
      open.value = false
    }
</script>

<template>
    <UModal v-model:open="open" title="Project settings" close-icon="i-lucide-x">
      <UButton class="cursor-pointer" icon="i-lucide-settings" color="neutral" variant="outline" />
      <template #body>
        <div class="flex flex-col gap-5">
          <div class="flex items-center gap-3">
              <UButton class="cursor-pointer" icon="i-lucide-arrow-down" color="info" @click="Export" :loading="isExporting" >Export project</UButton>
              <p v-if="isSuccessful" class="text-primary">Download successful!</p>
          </div>
          <div class="flex pt-10">
            <UButton class="cursor-pointer" icon="i-lucide-trash" color="error" @click="Delete" :loading="isDeleting">Delete project</UButton>
          </div>
        </div>
      </template>
    </UModal>
</template>