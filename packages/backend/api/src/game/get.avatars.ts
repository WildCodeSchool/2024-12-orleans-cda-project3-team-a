import { type Request, Router } from 'express';

import { db } from '@app/backend-shared';

const getAvatarsRoute = Router();

function getAvatars() {
  return db
    .selectFrom('avatars')
    .select(['avatars.id', 'avatars.src_image'])
    .execute();
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
