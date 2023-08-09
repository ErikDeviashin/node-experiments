import {Request, Response, Router} from "express";
import {HTTP_STATUSES} from "../HTTP_STATUSES";
import {DB} from "../db";

export const coursesRouter = Router({})

coursesRouter.get('/', (req: Request, res: Response) => {
    let foundCourses = DB.courses;

    if (req.query.title) {
        foundCourses = foundCourses.filter(c => c.title.indexOf(req.query.title as string) > -1)
    }

    res.json(foundCourses);
    return;
})

coursesRouter.get('/:id', (req: Request, res: Response) => {
    const foundCourse = DB.courses.find(c => c.id === Number(req.params.id));

    if (!foundCourse) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }

    res.json(foundCourse);
})

coursesRouter.post('/', (req: Request, res: Response) => {
    const title = req.body.title;

    if (!title || title.trim().length === 0) {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).json({message: 'Title is required'});
        return;
    }

    const newCourse = {
        id: Number(new Date()),
        title: req.body.title,
    };
    DB.courses.push(newCourse)
    res.status(HTTP_STATUSES.CREATED_201).json(newCourse);
})

coursesRouter.delete('/:id', (req: Request, res: Response) => {
    DB.courses = DB.courses.filter(c => c.id !== Number(req.params.id));

    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
})

coursesRouter.put('/:id', (req: Request, res: Response) => {
    const title = req.body.title;

    if (!title || title.trim().length === 0) {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).json({message: 'Title is required'});
        return;
    }

    const newCourseData = {
        title: req.body.title,
    };

    const courseIndex = DB.courses.findIndex(c => c.id === Number(req.params.id));
    DB.courses[courseIndex] = {...DB.courses[courseIndex], ...newCourseData};

    res.status(HTTP_STATUSES.CREATED_201).json(DB.courses[courseIndex]);
})
