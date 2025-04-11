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
  })
    .setProtectedHeader({
      alg: 'HS256',
    })
    //a qu'elle moment le token est généré
    .setIssuedAt()
    //par qui il est fais ? frontend
    .setIssuer(FRONTEND_HOST)
    //generer pour l'user
    .setAudience(FRONTEND_HOST)
    .setExpirationTime('3h')
    .sign(secret);
  console.log(token);

  res.cookie('token', token);

  res.json({
    message: 'User logged in!',
  });
});

export default postLoginRouter;
