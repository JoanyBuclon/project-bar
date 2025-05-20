<script setup lang="ts">
    const projectName = ref('Project Name')
    const completionPercent = ref(0)

    function checkEmpty() {
        if (projectName.value.trim() === '') projectName.value = 'Project Name'
    }
</script>

<template>
    <div class="flex items-center justify-center h-screen">
        <div class="flex flex-col gap-4 w-3/5 lg:w-1/2">
            <input v-model="projectName" class="text-xl lg:text-4xl font-bold text-center p-2 lg:p-6 focus:outline-none w-full" maxlength="50" @change="checkEmpty" />
            <UProgress v-model="completionPercent" color="primary" size="2xl" status />
            <TaskList @percentage="(percentage: number) => completionPercent = percentage" />
        </div>
    </div>
    <Footer />
</template>
