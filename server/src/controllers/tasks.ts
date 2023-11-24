import { Request, Response } from "express";

import { getTaskWatcher, getAllTasks, createNewTask, modifyTask, removeTask } from "../services/task";

export const getTasks = async (req: Request, res: Response) => {
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

  taskStream.on('change', async (data: any) => {
    if(data.operationType === 'insert' || data.operationType === 'replace'){
      res.write(`${JSON.stringify(data.fullDocument)}`)
    }
    res.write(`${JSON.stringify(await getAllTasks())}`)
  })

  req.on('close', () => {
    taskStream.close()
    res.end()
  });
}

export const createTask = async ({ body }: Request, res: Response) => {
  const { userEmail, title, description, priority } = body
  const responseTask = await createNewTask({ userEmail, title, description, priority });
  res.send(responseTask);
};

export const editTask = async ({ body }: Request, res: Response) => {
  const { userEmail, title, description, priority, _id} = body
  const responseTask = await modifyTask({ userEmail, title, description, priority, _id});
  res.send(responseTask)
};

export const deleteTask = async ({ params }: Request, res: Response) => {
  const { id } = params
  const responseTask = await removeTask(id);
  res.send(responseTask)
};