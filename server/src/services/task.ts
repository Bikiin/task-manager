import { Task } from "../interfaces/task.interface";
import TaskModel from "../models/task";

export const getTaskWatcher = async () =>{
    return TaskModel.watch()
}

export const getAllTasks = async () => {
    return await TaskModel.find({})
}

export const createNewTask = async (task: Task) => {
    const newTask = await TaskModel.create(task)
    return newTask
}

export const modifyTask = async (task: Task) => {
    await TaskModel.updateOne({_id: task._id}, task)
    return task
}

export const removeTask = async (id: string) => {
    await TaskModel.deleteOne({_id: id})
    return {}
}