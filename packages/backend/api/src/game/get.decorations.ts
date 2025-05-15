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
  const decorations = await getDecorations();

  if (decorations.length === 0) {
    res.json({
      ok: false,
      message: 'no decorations found',
    });
    return;
  }

  res.json({
    ok: true,
    decorations,
  });
});

export default getDecorationsRoute;
