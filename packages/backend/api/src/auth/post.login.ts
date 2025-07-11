import argon2 from 'argon2';
import express from 'express';
import * as jose from 'jose';

import { db } from '@app/backend-shared';

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const postLoginRouter = express.Router();
const FRONTEND_HOST = process.env.FRONTEND_HOST ?? '';
const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET);
const refreshTokenSecret = new TextEncoder().encode(
  process.env.REFRESH_TOKEN_SECRET,
);

postLoginRouter.post('/login', async (req, res) => {
  //get email and password in body
  const { email, password } = req.body;

  //get info in BDD for user, check if user or password are correct
  const user = await db
    .selectFrom('users')
    .leftJoin('parks', 'parks.user_id', 'users.id')
    .select([
      'users.password_hash',
      'users.id',
      'parks.id as parkId',
      'users.id',
      'users.email',
    ])
    .where('users.email', '=', email)
    .executeTakeFirst();

  if (!user) {
    res.json({
      ok: false,
      message: 'User or password incorrect',
    });
    return;
  }

  const { password_hash: userPasswordHash, ...restUser } = user;

  const isCorrectPassword = await argon2.verify(userPasswordHash, password);

  if (!isCorrectPassword) {
    res.json({
      message: 'User or password incorrect',
      ok: false,
    });
    return;
  }

  //token creation (header / payload / signature)
  const authToken = await new jose.SignJWT({
    sub: email,
    userId: user.id,
  })
    .setProtectedHeader({
      alg: 'HS256',
    })
    .setIssuedAt()
    .setIssuer(FRONTEND_HOST)
    .setAudience(FRONTEND_HOST)
    .setExpirationTime('60s')
    .sign(secret);
  res.cookie('authToken', authToken, {
    httpOnly: true,
    sameSite: 'strict',
    secure: IS_PRODUCTION,
    signed: true,
    maxAge: 60 * 60 * 24 * 7 * 1000,
  });

  const refreshToken = await new jose.SignJWT({
    sub: email,
    userId: user.id,
  })
    .setProtectedHeader({
      alg: 'HS256',
    })
    .setIssuedAt()
    .setIssuer(FRONTEND_HOST)
    .setAudience(FRONTEND_HOST)
    .setExpirationTime('7d')
    .sign(refreshTokenSecret);

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    sameSite: 'strict',
    secure: IS_PRODUCTION,
    signed: true,
    maxAge: 60 * 60 * 24 * 7 * 1000,
  });
  res.json({
    message: 'User logged in!',
    ok: true,
    user: restUser,
  });
});

export default postLoginRouter;
