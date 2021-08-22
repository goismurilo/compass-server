import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import cors from 'cors';
import routes from './shared/routes';

import UploadConfig from './config/upload';
import AppError from './shared/errors/AppError';

import './shared/database';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/files', express.static(UploadConfig.directory));
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }

    return response.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
    });
});

app.listen(3333, () => {
    // eslint-disable-next-line no-console
    console.log('🤖 Server started on port 3333!');
});
