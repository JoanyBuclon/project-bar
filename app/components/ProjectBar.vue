<script setup lang="ts">
    const projectName = ref('Project Name')
    const completionPercent = ref(0)
</script>

<template>
    <div class="flex items-center justify-center h-screen">
        <div class="flex flex-col gap-4 w-1/2">
            <input v-model="projectName" class="text-4xl font-bold text-center p-6 focus:outline-none" maxlength="40" />
            <UProgress v-model="completionPercent" color="primary" size="2xl" status />
            <TaskList @percentage="(percentage: number) => completionPercent = percentage" />
        </div>
    </div>
</template>
