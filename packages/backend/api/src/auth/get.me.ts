import express from 'express';
import * as jose from 'jose';

import { db } from '@app/backend-shared';

const FRONTEND_HOST = process.env.FRONTEND_HOST ?? '';
const secret = new TextEncoder().encode(process.env.JWT_SECRET);

const getMeRouter = express.Router();

getMeRouter.get('/me', async (req, res) => {
  const authToken = req.signedCookies.authToken;
  //   console.log(authToken);

  //verify if token is available
  try {
    const { payload } = await jose.jwtVerify<{
      userId: number;
    }>(authToken, secret, {
      audience: FRONTEND_HOST,
      issuer: FRONTEND_HOST,
    });

    // console.log(payload);

    const userId = payload.userId;

    const user = await db
      .selectFrom('users')
      .select(['users.id', 'users.email'])
      .where('users.id', '=', userId)
      .executeTakeFirst();

    // console.log(userId);

    if (!user) {
      res.json({
        ok: false,
      });
      return;
    }

    res.json({
      ok: true,
      user,
    });
  } catch (error) {
    res.json({
      ok: false,
    });
  }
});

export default getMeRouter;
