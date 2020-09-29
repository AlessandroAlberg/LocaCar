import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

//not Found
app.use((request: Request, response: Response, next: NextFunction) => {
    const error = new Error('Not found')
    next(error);
});

// catch all
app.use((response: Response ) => {
    response.status(500);
});

app.listen(3333, () => console.log('Server is running'));