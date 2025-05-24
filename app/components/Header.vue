<script setup lang="ts">
    import type { DropdownMenuItem } from '@nuxt/ui';

    const items = ref<DropdownMenuItem[][]>([
        [
            {
                label: 'Projects',
                icon: 'fa6-regular:folder',
                color: 'primary'
            },
            {
                label: 'Import new project',
                icon: 'fa6-regular:circle-up'
            },
            {
                label: 'Export current project',
                icon: 'fa6-regular:circle-down'
            }
        ],
        [
            {
                label: 'Github',
                icon: 'i-simple-icons-github',
                to: 'https://github.com/JoanyBuclon/project-bar',
                target: '_blank'
            },
            {
                label: 'Roadmap',
                icon: 'i-simple-icons-trello',
                to: 'https://trello.com/b/hRjd7xWq/projectbar',
                target: '_blank'
            },
            {
                label: 'About Project-Bar',
                icon: 'fa6-regular:lightbulb'
            }
        ]
    ])
</script>

<template>
    <header class="flex fixed top-0 right-0 p-8">
        <UDropdownMenu :items="items" :ui="{ content: 'w-48' }" >
            <UButton icon="i-lucide-menu" color="neutral" variant="outline" />
        </UDropdownMenu>
    </header>
</template>