import express from 'express';
import { sql } from 'kysely';

import { db } from '@app/backend-shared';

import demoMiddleware from '@/middlewares/demo.middleware';

const getDemoRouter = express.Router();

getDemoRouter.get('/', demoMiddleware, async (_req, res) => {
  const { rows } = await sql<{
    coucou: number;
  }>`SELECT 1 as coucou;`.execute(db);

  const [row] = rows;

  res.json({ someProperty: `Hello World from API! ${row.coucou}` });
  return;
});

export default getDemoRouter;
