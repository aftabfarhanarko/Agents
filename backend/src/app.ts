import cors from 'cors';
import express from 'express';
import { errorHandler } from './middleware/error.middleware';
import { notFound } from './middleware/not-found.middleware';
import apiRouter from './routes';

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());

app.use('/api', apiRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
