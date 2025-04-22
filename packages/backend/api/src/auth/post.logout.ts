import express from 'express';

const postLogoutRouter = express.Router();

postLogoutRouter.post('/logout', (req, res) => {
  res.clearCookie('authToken');

  res.json({
    ok: true,
  });
});

export default postLogoutRouter;
