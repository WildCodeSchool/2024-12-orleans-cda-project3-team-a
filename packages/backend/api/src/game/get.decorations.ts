import express from 'express';

import { db } from '@app/backend-shared';

const getDecorationRoute = express.Router();

function getDecorations() {
  return db
    .selectFrom('decorations')
    .select(['src_image', 'creature_id', 'position'])
    .execute();
}

export type Decorations = Awaited<ReturnType<typeof getDecorations>>;

getDecorationRoute.get('/info-decoration', async (_req, res) => {
  const parkId = 1;

  const decoration = await getDecorations();

  if (!decoration) {
    res.json({
      message: 'Echec',
    });
    return;
  }

  res.json({
    decoration,
  });
});

export default getDecorationRoute;
