import cors from 'cors';
import express, { Express } from 'express';
import userRoutes from '../routes/users';

export default (app: Express) => {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static('public'));

  app.use('/api/users', userRoutes);
};
