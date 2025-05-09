import { type Request, Router } from 'express';

const getPark = Router();

getPark.get('/', (req: Request, res) => {
  const parkId = req.parkId;

  if (parkId === undefined) {
    res.json({
      ok: false,
      message: 'no park id',
    });
    return;
  }

  res.json({
    ok: true,
    message: 'park id find',
    parkId,
  });
});

export default getPark;
