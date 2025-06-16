import supertest from 'supertest';
import { describe, expect, it } from 'vitest';

import app from '..';

describe('post /api/game/creature/buy', () => {
  //allow to stock cookie
  const agent = supertest.agent(app);

  //login
  it('should return login ok true', async () => {
    const email = 'test@mail.com';
    const password = '123456';

    const res = await agent.post('/api/auth/login').send({ email, password });

    //check if result is ok
    expect(res.status).toBe(200);
    expect(res.body.ok).toEqual(true);
    //check if we not send pass in the result
    expect(res.body.user.password).toBeUndefined();
    expect(res.body.user.password_hash).toBeUndefined();
  });

  it('should return creature and visitor added', async () => {
    const name = 'toto';
    const zoneId = 1;

    const res = await agent
      .post('/api/game/creature/buy?creatureId=2')
      .send({ name, zoneId });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      ok: true,
      message: 'creature and visitor added',
    });
  });
});
