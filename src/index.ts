import express from 'express';

const app = express();

const jsonBodyMiddleware = express.json();

app.use(jsonBodyMiddleware)

const HHTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,

    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404,
}

const DB = {
    courses: [{id: 1, title: 'course1'}, {id: 2, title: 'course2'}, {id: 3, title: 'course3'}]
}

app.get('/', (req, res) => {
    res.send('Use \'/courses\' endpoint to get courses');
})

app.get('/courses', (req, res) => {
    let foundCourses = DB.courses;

    if (req.query.title) {
        foundCourses = foundCourses.filter(c => c.title.indexOf(req.query.title as string) > -1)
    }

    res.json(foundCourses);
})

app.get('/courses/:id', (req, res) => {
    const foundCourse = DB.courses.find(c => c.id === Number(req.params.id));

    if (!foundCourse) {
        res.sendStatus(HHTP_STATUSES.NOT_FOUND_404);
        return;
    }

    res.json(foundCourse);
})

app.post('/courses', (req, res) => {
    const title = req.body.title;

    if (!title || title.trim().length === 0) {
        res.status(HHTP_STATUSES.BAD_REQUEST_400).json({message: 'Title is required'});
        return;
    }

    const newCourse = {
        id: Number(new Date()),
        title: req.body.title,
    };
    DB.courses.push(newCourse)
    res.status(HHTP_STATUSES.CREATED_201).json(newCourse);
})

app.delete('/courses/:id', (req, res) => {
    DB.courses = DB.courses.filter(c => c.id !== Number(req.params.id));

    res.sendStatus(HHTP_STATUSES.NO_CONTENT_204);
})

app.put('/courses/:id', (req, res) => {
    const title = req.body.title;

    if (!title || title.trim().length === 0) {
        res.status(HHTP_STATUSES.BAD_REQUEST_400).json({message: 'Title is required'});
        return;
    }

    const newCourseData = {
        title: req.body.title,
    };

    const courseIndex = DB.courses.findIndex(c => c.id === Number(req.params.id));
    DB.courses[courseIndex] = {...DB.courses[courseIndex], ...newCourseData};

    res.status(HHTP_STATUSES.CREATED_201).json(DB.courses[courseIndex]);
})

app.listen(3003, () => {
    console.log('Server is running! Port: 3003');
})

//fetch('http://localhost:3003', {method: 'GET'}).then((res)=>res.json()).then((json)=>console.log(json))