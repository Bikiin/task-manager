import { NextFunction, Response, Request } from "express";

export function responseMiddleware(_req: Request, res: Response, next: NextFunction) {
  const originalJson = res.json;

  // @ts-ignore:disable-next-line *
  res.json = function (data) {
    const response: { [key: string]: any } = { status: res.statusCode }
    if(data.error){
      response.error = data.error
      response.response = null
    }
    else{
      response.response = data
    }
    originalJson.call(this, response);
  };
  next();
}
  