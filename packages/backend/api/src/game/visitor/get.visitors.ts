import { type Request, Router } from 'express';

const getVisitors = Router();

getVisitors.get('/', (req: Request, res) => {
  const parkId = req.parkId;

  if (parkId === undefined) {
    res.json({
      ok: false,
      message: 'no park id in get visitors',
    });
    return;
  }

  //faire la requete sur les visiteurs

  res.json({
    //envoyer la valeur qu'on veut
  });
});
