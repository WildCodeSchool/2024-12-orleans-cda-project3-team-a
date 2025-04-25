import express from 'express';

import { db } from '@app/backend-shared';

const getInfoCreature = express.Router();

getInfoCreature.get('/info-creatures', async (require, res) => {
  const creaturesInfo = await db.selectFrom('creatures').selectAll().execute();
  if (!creaturesInfo) {
    res.json({
      message: 'Echec',
    });
    return;
  }
  res.json({
    creaturesInfo,
  });
});

export default getInfoCreature;
