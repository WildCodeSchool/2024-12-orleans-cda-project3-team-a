import express from 'express';

const postLoginRouter = express.Router();

postLoginRouter.post('/login', (req, res) => {
  //on va récupérer email et password
  const { email, password } = req.body;
  console.log({ email, password });
  res.send();
});

export default postLoginRouter;
