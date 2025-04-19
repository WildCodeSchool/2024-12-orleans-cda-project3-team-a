import argon2 from 'argon2';
import express from 'express';
import * as jose from 'jose';

import { db } from '@app/backend-shared';

const postLoginRouter = express.Router();
//on recupere le .env
const FRONTEND_HOST = process.env.FRONTEND_HOST ?? '';
const secret = new TextEncoder().encode(process.env.JWT_SECRET);

postLoginRouter.post('/login', async (req, res) => {
  //get email and password in body
  const { email, password } = req.body;

  //get info in BDD for user, check if user or password are correct
  const user = await db
    .selectFrom('users')
    .selectAll()
    .where('users.email', '=', email)
    .executeTakeFirst();

  if (!user) {
    res.json({
      message: 'User or password incorrect',
    });
    return;
  }

  const isCorrectPassword = await argon2.verify(user.password_hash, password);

  if (!Boolean(isCorrectPassword)) {
    res.json({
      message: 'User or password incorrect',
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
  // console.log(authToken);

  res.cookie('authToken', authToken, {
    httpOnly: true,
    // sameSite: '',
    // secure: '',
    signed: true,
  });

  res.json({
    message: 'User logged in!',
  });
});

export default postLoginRouter;
