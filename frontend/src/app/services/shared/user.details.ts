export class UserDetails{

    constructor(
        public username: string,
        public profilePictureURL: string,
        public totalTasks: number,
        public completedTasks: number,
        public user_id: string,
        public level: number
    ) { }

}