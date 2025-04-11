import argon2 from 'argon2';
import express from 'express';

import { db } from '@app/backend-shared';

const postRegisterRouter = express.Router();

postRegisterRouter.post('/register', async (req, res) => {
  //on va récupérer email et password dans le body
  const { username, email, password, confirmPassword, avatarId } = req.body;

  const user = await db
    .selectFrom('users')
    .selectAll()
    .where('users.email', '=', email)
    .executeTakeFirst();

  //check is mail is already existing
  if (user) {
    res.json({
      message: 'User already used',
    });
    return;
  }

  //check if is the same password
  if (password !== confirmPassword) {
    res.status(400).json({ message: 'Passwords do not match!' });
    return;
  }

  //hash of password
  const hashedPassword = await argon2.hash(password, {
    memoryCost: 19456,
    timeCost: 2,
    parallelism: 1,
  });

  //insert data in table users
  await db
    .insertInto('users')
    .values({
      email,
      username,
      password_hash: hashedPassword,
      avatar_id: avatarId ?? null, //optional
    })
    .executeTakeFirst();

  res.json({
    message: 'User registered',
  });
});

export default postRegisterRouter;
