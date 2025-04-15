import argon2 from 'argon2';
import express from 'express';
import * as jose from 'jose';

import { db } from '@app/backend-shared';

const postLoginRouter = express.Router();
//on recupere le .env
const FRONTEND_HOST = process.env.FRONTEND_HOST ?? '';
const JWT_SECRET = process.env.JWT_SECRET;

const secret = new TextEncoder().encode(JWT_SECRET);

postLoginRouter.post('/login', async (req, res) => {
  //on va récupérer email et password
  const { email, password } = req.body;

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

  if (!isCorrectPassword) {
    res.json({
      message: 'User or password incorrect',
    });
    return;
  }

  //ici on génère le payloads
  const token = await new jose.SignJWT({
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
  // console.log(token);

  res.cookie('token', token, {
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
