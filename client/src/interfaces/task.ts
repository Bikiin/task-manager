export interface Task {
    _id: string,
    title: string;
    description: string;
    userName: string,
    userEmail: string;
    priority: 1 | 2 | 3;
}