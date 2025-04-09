import express from 'express';

import postLoginRouter from './post.login';
import postRegisterRouter from './post.register';

const authRouter = express.Router();

authRouter.use(postLoginRouter);
authRouter.use(postRegisterRouter);

export default authRouter;
