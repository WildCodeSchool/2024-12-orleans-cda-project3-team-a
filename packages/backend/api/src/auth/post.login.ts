import argon2 from 'argon2';
import express from 'express';

import { db } from '@app/backend-shared';

const postLoginRouter = express.Router();

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

  res.json({
    message: 'User loged in',
  });
});

export default postLoginRouter;
