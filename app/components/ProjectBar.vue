<script setup lang="ts">
const projectName = ref('Project Name');
const completionPercent = ref(0);
</script>

<template>
    <div class="flex items-center justify-center h-screen">
        <div class="flex flex-col gap-4 w-1/2">
            <h1 class="text-2xl font-bold self-center">{{ projectName }}</h1>
            <UProgress v-model="completionPercent" color="primary" size="xl" status />
            <TaskList @percentage="(percentage: number) => completionPercent = percentage" />
        </div>
    </div>
</template>
