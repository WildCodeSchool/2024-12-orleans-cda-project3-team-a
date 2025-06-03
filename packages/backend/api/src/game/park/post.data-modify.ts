import type { Request } from 'express';
import express from 'express';

import { db } from '@app/backend-shared';

const postPark = express.Router();

postPark.post('/data-modify', async (req: Request, res) => {
  const userId = req.userId;

  const { newUserName, newParkName, selectedAvatar } = req.body;

  if (userId === undefined) {
    res.json({
      ok: false,
      message: ' no user id found',
    });
    return;
  }

  const messages: string[] = [];

  // update username if exist
  if (newUserName !== undefined) {
    await db
      .updateTable('users')
      .set({ username: newUserName })
      .where('id', '=', userId)
      .executeTakeFirst();

    messages.push('Username updated');
  }

  // update parkname if exist
  if (newParkName !== undefined) {
    await db
      .updateTable('parks')
      .set({ park_name: newParkName })
      .where('user_id', '=', userId)
      .executeTakeFirst();

    messages.push('Park name updated');
  }

  // update avatar if new avatar selected
  if (selectedAvatar !== undefined) {
    await db
      .updateTable('users')
      .set({ avatar_id: selectedAvatar })
      .where('id', '=', userId)
      .executeTakeFirst();

    messages.push('Avatar updated');
  }

  if (messages.length === 0) {
    res.status(400).json({
      ok: false,
      message: 'Nothing to update',
    });
  }

  res.json({
    ok: true,
    message: messages.join(' + '),
  });
});

export default postPark;
