import argon2 from 'argon2';
import type { Request } from 'express';
import express from 'express';

import { db } from '@app/backend-shared';

const postEditPasswordRouter = express.Router();

postEditPasswordRouter.post('/edit-password', async (req: Request, res) => {
  const userId = req.userId;

  const { actualPassword, newPassword, confirmPassword } = req.body;

  if (userId === undefined) {
    res.json({
      ok: false,
      message: ' no user id found',
    });
    return;
  }

  const user = await db
    .selectFrom('users')
    .select('password_hash')
    .where('users.id', '=', userId)
    .executeTakeFirst();

  if (!user) {
    res.json({
      message: 'No user found',
      ok: false,
    });
    return;
  }

  //check if is the right password
  const isCorrectPassword = await argon2.verify(
    user.password_hash,
    actualPassword,
  );

  if (!isCorrectPassword) {
    res.json({
      message: 'Passwords do not match baby!',
      ok: false,
    });
    return;
  }

  //check if is the new password and Confirmpassword are same
  if (newPassword !== confirmPassword) {
    res.status(400).json({
      message: 'Passwords do not match!',
      ok: false,
    });
    return;
  }

  //hash password
  const hashedPassword = await argon2.hash(newPassword, {
    memoryCost: 19456,
    timeCost: 2,
    parallelism: 1,
  });

  //insert new password in table users
  await db
    .updateTable('users')
    .set({
      password_hash: hashedPassword,
    })
    .where('id', '=', userId)
    .executeTakeFirst();

  res.json({
    message: 'Password updated',
    ok: true,
  });
});

export default postEditPasswordRouter;
