export interface Task {
    name: string
    description: string
    state:'incomplete'|'complete'|'in progress'|'not started'
    day: string
    start_time: string
    end_time: string
}