import express from 'express';

const postAddBarrier = express.Router();

postAddBarrier.post('/add-barrier', async (req, res) => {
  const userId = 8;

  const parkInfo = await db
    .selectFrom('parks')
    .selectAll()
    .where('parks.user_id', '=', userId)
    .executeTakeFirst();

  if (!parkInfo) {
    res.json({
      message: 'no user corresponding',
    });
    return;
  }

  res.json({
    parkInfo,
  });
});

export default postAddBarrier;
