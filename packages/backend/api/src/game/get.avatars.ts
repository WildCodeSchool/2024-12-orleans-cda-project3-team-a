import { type Request, Router } from 'express';

import { db } from '@app/backend-shared';

const getAvatarsRoute = Router();

function getAvatars() {
  return db.selectFrom('avatars').selectAll().execute();
}

export type Avatar = Awaited<ReturnType<typeof getAvatars>>[number];

getAvatarsRoute.get('/avatars', async (req: Request, res) => {
  const avatars = await getAvatars();

  res.json({
    ok: true,
    avatars,
  });
});

export default getAvatarsRoute;
