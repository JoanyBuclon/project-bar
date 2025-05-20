import type { Project } from "./project";
import type { Task } from "./task";

export interface SimpleProject extends Project {
    tasks: Task[]
}