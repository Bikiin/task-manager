export interface Task {
    _id?: string,
    title: string;
    description: string;
    userEmail: string;
    userName: string;
    priority: 1 | 2 | 3;
}