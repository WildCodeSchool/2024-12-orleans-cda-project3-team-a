import supertest from 'supertest';
import { describe, expect, it } from 'vitest';

import app from '..';

describe('post /api/auth/log', () => {
  //root to login ok
  it('root login', async () => {
    const email = 'relou@mail.com';
    const password = '123456';

    const res = await supertest(app)
      .post('/api/auth/login')
      .send({ email, password });

    //check if result is ok
    expect(res.status).toBe(200);
    expect(res.body.ok).toEqual(true);
    //check if we not send pass in the result
    expect(res.body.user.password).toBeUndefined();
    expect(res.body.user.password_hash).toBeUndefined();
  });

  //root to login KO user is BDD but passwork KO
  it('should return creature and visitor added', async () => {
    const email = 'relou@mail.com';
    const password = '1234';

    const res = await supertest(app)
      .post('/api/auth/login')
      .send({ email, password });

    //check if result is ok
    expect(res.body).toEqual({
      message: 'User or password incorrect',
      ok: false,
    });
  });

  //root to login KO user is not in BDD
  it('should return creature and visitor added', async () => {
    const email = 'relourelou@mail.com';
    const password = '123456';

    const res = await supertest(app)
      .post('/api/auth/login')
      .send({ email, password });

    //check if result is ok
    expect(res.body).toEqual({
      message: 'User or password incorrect',
      ok: false,
    });
  });
});
