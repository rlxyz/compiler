// Imports
import express from 'express';
import cors from 'cors';
import collectionRouter from './routes/collection';

// Application
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());

// Routes
app.use('/collection', collectionRouter);
app.get('/health_check', (_, res) => {
  res.status(200).end(`May the force be with you!`);
});
app.get('/', (_, res) => res.status(404).end('You are channelling the force.'));

// Connection
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
