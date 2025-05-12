<script setup lang="ts">
const tasks = ref([
    {
        name: 'Task 1',
        completed: true
    },
    {
        name: 'Task 2',
        completed: false
    },
    {
        name: 'Task 3',
        completed: false
    }
]);

const emit = defineEmits(['percentage']);

function calculatePercentage() {
    const completedTasks = tasks.value.filter(task => task.completed).length;
    const percentage = Math.round((completedTasks / tasks.value.length) * 100);
    emit('percentage', percentage);
};

calculatePercentage();
</script>

<template>
    <div v-for="task in tasks" :key="task.name">
        <UCheckbox v-model="task.completed" :label="task.name" @change="calculatePercentage" />
    </div>
</template>
