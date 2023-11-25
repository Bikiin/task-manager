import { NextFunction, Request, Response } from "express";

import { getTaskWatcher, getAllTasks, createNewTask, modifyTask, removeTask } from "../services/task";

export const getTasks = async (req: Request, res: Response, next: NextFunction) => {
  try{
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      Connection: 'keep-alive',
      'Content-Encoding': 'none',
      'Cache-Control': 'no-cache, no-transform',
      'Content-Type': 'text/event-stream;charset=utf-8'
    })
    res.flushHeaders();
  
    const taskStream = await getTaskWatcher()
  
    res.write(`${JSON.stringify(await getAllTasks())}`)
    taskStream.on('change', async () => res.write(`${JSON.stringify(await getAllTasks())}`))
  
    req.on('close', () => {
      taskStream.close()
      res.end()
    });
  }catch(err){
    next(err)
  }
}

export const createTask = async ({ body }: Request, res: Response, next: NextFunction) => {
  try{
    const { userEmail, userName, title, description, priority } = body
    const responseTask = await createNewTask({ userEmail, userName,title, description, priority });
    res.send(responseTask);
  }catch(err){
    next(err)
  }
};

export const editTask = async ({ body }: Request, res: Response, next: NextFunction) => {
  try{
    const { userEmail, userName, title, description, priority, _id} = body
    const responseTask = await modifyTask({ userEmail, userName, title, description, priority, _id});
    res.send(responseTask)
  }catch(err){
    next(err)
  }
};

export const deleteTask = async ({ params }: Request, res: Response, next: NextFunction) => {
  try{
    const { id } = params
    const responseTask = await removeTask(id);
    res.send(responseTask)
  }catch(err){
    next(err)
  }
};