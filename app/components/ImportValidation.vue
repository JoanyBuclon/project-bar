<script setup lang="ts">
    const props = defineProps<{ open: boolean }>()

    const emit = defineEmits<{ replace: [boolean] }>()
    
</script>

<template>
    <UModal v-model:open="props.open" :dismissible="false" >
      <template #content>
        <div class="p-12">
            <h2 class="text-xl">Import warning</h2>
            <p class="flex pb-10">This project already exist in your current list. Would you like to replace it or create a new one?</p>
            <div class="flex justify-center">
                <UButton class="cursor-pointer m-2" color="error" @click="emit('replace', true)">Replace existing</UButton>
                <UButton class="cursor-pointer m-2" color="info" @click="emit('replace', false)">Save as new</UButton>
            </div>
        </div>
      </template>
    </UModal>
</template>