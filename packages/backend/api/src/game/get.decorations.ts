import express from 'express';

import { db } from '@app/backend-shared';

const getDecorationsRoute = express.Router();

function decorations() {
  return db
    .selectFrom('decorations')
    .select(['src_image', 'creature_id', 'position'])
    .execute();
}

export type Decorations = Awaited<ReturnType<typeof decorations>>;

getDecorationsRoute.get('/decoration', async (_req, res) => {
  const decoration = await decorations();

  if (decoration.length === 0) {
    res.json({
      ok: false,
      message: 'no decorations founded',
    });
    return;
  }

  res.json({
    decoration,
  });
});

export default getDecorationsRoute;
