<script setup lang="ts">
    import type { SimpleProject } from '~/types/simple-project';

    const props = defineProps<{ projects: Array<SimpleProject> }>()
    const emit = defineEmits(['import'])

    const open = ref(false)
    const json = ref<SimpleProject>()
    const error = ref<string>('')

    function onFileSet(event: Event) {
        error.value = ''
        const target = event.target as HTMLInputElement
        if (!target.files || target.files.length !== 1) return
        
        const file = target.files[0]
        if (!file) return

        const reader = new FileReader()
        let value : SimpleProject
        reader.onload = () => {
            try {
                value = JSON.parse(reader.result as string)

                if (!value.name || !value.id) {
                    error.value = 'Name or Id missing. Try importing another file.'
                    return
                }

                json.value = value
                error.value = ''
            } catch {
                error.value = 'Invalid json detected. Try importing another file.'
                return
            }
        }

        reader.onerror = () => error.value = 'Something went wrong. Try importing the file again.'
        reader.readAsText(file)
    }

    function onImport() {
        if (!json.value) return
        const project = json.value
        project.lastUpdate = new Date()
        const exist = props.projects.some(p => p.id === project.id)

        if (exist) {
            error.value = 'ce cas'
            return
        }
        
        emit('import', project)
    }

    function init() {
        json.value = undefined
        error.value = ''
    }

</script>

<template>
    <UModal v-model:open="open" title="Import project" description="Choose a project to import" close-icon="i-lucide-x">
      <UButton class="cursor-pointer" icon="i-lucide-arrow-up" label="Import project" @click="init" />
      <template #body>
        <div class="flex items-center justify-center w-full">
            <label v-if="!json" for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer border-gray-600 hover:border-primary">
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <UIcon name="i-lucide-cloud-upload"/>
                    <p class="mb-2 text-sm text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                    <p class="text-xs text-gray-400">Enter a valid JSON file</p>
                </div>
                <input id="dropzone-file" type="file"  @change="onFileSet" accept=".json" class="hidden" />
            </label>
        </div>
        <p v-if="json && !error" class="text-primary">Project detected! Click import to start.</p>
        <p v-if="error" class="text-red-500">{{ error }}</p>
      </template>
      <template #footer>
        <div class="flex gap-1.5 justify-end w-full">
            <UButton class="cursor-pointer" icon="i-lucide-plus" :disabled="!json" @click="onImport">Import</UButton>
        </div>
      </template>
    </UModal>
</template>