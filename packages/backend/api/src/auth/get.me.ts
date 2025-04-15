import express from 'express';
import * as jose from 'jose';

import { db } from '@app/backend-shared';
import { env } from '@app/shared';

env();
const FRONTEND_HOST = process.env.FRONTEND_HOST ?? '';
const JWT_SECRET = process.env.JWT_SECRET;
const secret = new TextEncoder().encode(JWT_SECRET);

const getMeRouter = express.Router();

getMeRouter.get('/me', async (req, res) => {
  const token = req.signedCookies.token;
  //   console.log(token);

  try {
    const { payload } = await jose.jwtVerify<{
      userId: number;
    }>(token, secret, {
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
