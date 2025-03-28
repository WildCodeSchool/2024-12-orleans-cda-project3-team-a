import express from 'express';

const postDemoRouter = express.Router();

postDemoRouter.post('/', (_req, res) => {
  const value: SomeInterface = {
    someProperty: 'someValueFromApi',
  };

  res.json(value);

  return;
});

export default postDemoRouter;
