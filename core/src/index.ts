// Imports
import express from 'express';
import cors from 'cors';
import collectionRouter from './routes/collections';

// Application
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());

// Routes
app.use('/collection', collectionRouter);
app.get('/gm', (_, res) => {
  res.status(200).end(`May the force be with you!`);
});

// Connection
app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
