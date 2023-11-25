import { Router } from "express";
import { readdirSync } from "fs";

//Code to generate dynamically the routes, 
//this code makes that inside the routes 
//it is not necessary to name the name of the route. Example:
//routes/tasks.ts
//before router.get('/tasks', cb)
//then router.get('/', cb)

const PATH_ROUTER = `${__dirname}`
const router = Router()

const cleanFileName = (fileName: string) => fileName.split(".").shift()

readdirSync(PATH_ROUTER).filter(async (fileName) => {
  const cleanName = cleanFileName(fileName)
  if (cleanName !== "index") router.use(`/${cleanName}`, (await import(`./${cleanName}`)).default)
});

export { router };