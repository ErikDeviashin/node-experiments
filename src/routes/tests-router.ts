import {Request, Response, Router} from "express";
import {DB} from "../db";
import {HTTP_STATUSES} from "../HTTP_STATUSES";

export const testsRouter = Router({})

testsRouter.delete('/reset', (req: Request, res: Response) => {
    DB.courses = [];
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})