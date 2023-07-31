export class SimpleTodo {

    constructor(
        public name: string,
        public description: string,
        public state: 'incomplete'|'complete'|'in progress'|'not started',
        public day: string,
        public start_time: string,
        public end_time: string,
    ) {}
}