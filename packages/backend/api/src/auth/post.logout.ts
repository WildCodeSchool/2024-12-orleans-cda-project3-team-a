import express from 'express';

const postLogoutRouter = express.Router();

postLogoutRouter.post('/logout', (_req, res) => {
  res.clearCookie('authToken');
  res.clearCookie('refreshToken');

  res.json({
    ok: true,
  });
});

export default postLogoutRouter;
