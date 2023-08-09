import express, {type Request, type Response} from 'express';
import {coursesRouter} from "./routes/courses-router";
import {testsRouter} from "./routes/tests-router";

export const app = express();

const jsonBodyMiddleware = express.json();

app.use(jsonBodyMiddleware)

const PORT = process.env.PORT || 3003

app.use('/courses', coursesRouter)
app.use('/__test__', testsRouter)

app.get('/', (req: Request, res: Response) => {
    res.send('<h1>Hello, Vladimir!</h1><h2>You can add "/courses" to url above to get "courses" array!</h2><p>But that\'s all for now :)</p>');
})



app.listen(PORT, () => {
    console.log('Server is running! Port: 3003');
})
