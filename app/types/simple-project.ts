import type { Project } from "./project";
import type { Task } from "./task";

export interface SimpleProject extends Project {
    tasks: Task[]
}

export const defaultSimpleProject = (): SimpleProject => {
    return {
        id: Date.now().toString(),
        name: 'Project Name',
        type: 'simple-tasks',
        lastUpdate: new Date(),
        tasks: [
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
        ]
    }
}