import express from 'express';

import postLoginRouter from './post.login';
import postRegisterRouter from './post.register';
import getMeRouter from './get.me';

const authRouter = express.Router();

authRouter.use(getMeRouter);
authRouter.use(postLoginRouter);
authRouter.use(postRegisterRouter);

export default authRouter;
