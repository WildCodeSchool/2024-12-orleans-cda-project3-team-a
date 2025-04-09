import argon2 from 'argon2';
import express from 'express';

import { db } from '@app/backend-shared';

const postRegisterRouter = express.Router();

postRegisterRouter.post('/register', async (req, res) => {
  //on va récupérer email et password dans le body
  const { username, email, password, avatarId } = req.body;

  const hashedPassword = await argon2.hash(password, {
    memoryCost: 19456,
    timeCost: 2,
    parallelism: 1,
  });
  // console.log({username, email, hashedPassword, avatarId});

  await db
    .insertInto('users')
    .values({
      username,
      email,
      password_hash: hashedPassword,
      avatar_id: avatarId,
    })
    .executeTakeFirst();

  res.json({
    message: 'User registered',
  });
});

export default postRegisterRouter;
