<script setup lang="ts">
    import type { DropdownMenuItem } from '@nuxt/ui';

    const items = ref<DropdownMenuItem[][]>([
        [
            {
                label: 'Projects',
                icon: 'i-lucide-folder',
                color: 'primary'
            },
            {
                label: 'Import new project',
                icon: 'i-lucide-arrow-up'
            },
            {
                label: 'Export current project',
                icon: 'i-lucide-arrow-down'
            }
        ],
        [
            {
                label: 'Github',
                icon: 'i-lucide-github',
                to: 'https://github.com/JoanyBuclon/project-bar',
                target: '_blank'
            },
            {
                label: 'Roadmap',
                icon: 'i-lucide-trello',
                to: 'https://trello.com/b/hRjd7xWq/projectbar',
                target: '_blank'
            },
            {
                label: 'About Project-Bar',
                icon: 'i-lucide-lightbulb'
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