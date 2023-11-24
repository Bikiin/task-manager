import { Router } from "express";
import { readdirSync } from "fs";

const PATH_ROUTER = `${__dirname}`
const router = Router()

const cleanFileName = (fileName: string) => fileName.split(".").shift()

readdirSync(PATH_ROUTER).filter(async (fileName) => {
  const cleanName = cleanFileName(fileName)
  if (cleanName !== "index") router.use(`/${cleanName}`, (await import(`./${cleanName}`)).default)
});

export { router };