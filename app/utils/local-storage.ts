import type { SimpleProject } from "~/types/simple-project"

export const getProjects = (key: string): SimpleProject[] => {
    if (import.meta.client) {
        const projects = localStorage.getItem(key)

        if (!projects) return []
        return JSON.parse(projects)
    }

    return []
}

export const setProjects = (key: string, value: any): void => {
    if (import.meta.client)
        localStorage.setItem(key, JSON.stringify(value))
}