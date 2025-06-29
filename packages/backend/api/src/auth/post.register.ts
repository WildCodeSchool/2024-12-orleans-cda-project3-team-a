import argon2 from 'argon2';
import express from 'express';

import { db } from '@app/backend-shared';

const postRegisterRouter = express.Router();

postRegisterRouter.post('/register', async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  const user = await db
    .selectFrom('users')
    .select('email')
    .where('users.email', '=', email)
    .executeTakeFirst();

  //check is mail is already existing
  if (user) {
    res.json({
      ok: false,
      message: 'Email already used',
    });
    return;
  }

  //check if is the same password
  if (password !== confirmPassword) {
    res.status(400).json({
      message: 'Passwords do not match!',
      ok: false,
    });
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
    })
    .executeTakeFirst();

  res.json({
    ok: true,
    message: 'User registered',
  });
});

export default postRegisterRouter;
