import supertest from 'supertest';
import { describe, expect, it } from 'vitest';

import app from '../';

describe('GET /api/demo', () => {
  it('should return 200', async () => {
    const res = await supertest(app).get('/api/demo');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ someProperty: 'Hello World from API! 1' });
  });
});
