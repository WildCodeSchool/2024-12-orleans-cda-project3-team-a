import express from 'express';

import { db } from '@app/backend-shared';

const getDecorationsRoute = express.Router();

function getDecorations() {
  return db
    .selectFrom('decorations')
    .select(['src_image', 'creature_id', 'position'])
    .execute();
}

export type Decorations = Awaited<ReturnType<typeof getDecorations>>;

getDecorationsRoute.get('/decorations', async (_req, res) => {
  const decoration = await getDecorations();

  if (decoration.length === 0) {
    res.json({
      ok: false,
      message: 'no decorations founded ',
    });
    return;
  }

  res.json({
    decoration,
  });
});

export default getDecorationsRoute;
