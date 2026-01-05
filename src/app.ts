import 'dotenv/config';
import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import loggerMorgan from 'morgan';

import routes from './routes/index.routes';

const app = express();

app.disable('x-powered-by');
app.use(helmet());
app.use(compression());
app.use(loggerMorgan('dev'));
app.use(cors());
app.use(express.json({ limit: 12 * 1024 * 1024 }));
app.use(express.urlencoded({ extended: true }));

app.use(routes);

export default app;
