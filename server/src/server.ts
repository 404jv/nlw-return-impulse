import express from 'express';

import { routes } from './routes';
import logger from './utils/logger';

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333, () => logger.info('🚀 Server started on port 3333'));
