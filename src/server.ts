import 'reflect-metadata';

import express from 'express';
import cors from 'cors';
import routes from './routes';

import UploadConfig from './config/upload';

import './database';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/files', express.static(UploadConfig.directory));
app.use(routes);

app.listen(3333, () => {
    // eslint-disable-next-line no-console
    console.log('🤖 Server started on port 3333!');
});
