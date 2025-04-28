import type { NextFunction, Request, Response } from 'express';
import * as jose from 'jose';

const FRONTEND_HOST = process.env.FRONTEND_HOST ?? '';
const ACCESS_TOKEN_SRECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

const secret = new TextEncoder().encode(ACCESS_TOKEN_SRECRET);
const refreshTokenSecret = new TextEncoder().encode(REFRESH_TOKEN_SECRET);

export default async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authToken = req.signedCookies.authToken;
  try {
    const { payload } = await jose.jwtVerify<{
      userId: number;
    }>(authToken, secret, {
      audience: FRONTEND_HOST,
      issuer: FRONTEND_HOST,
    });

    req.isAuthenticated = true;
    req.userId = payload.userId;
  } catch (atError) {
    req.isAuthenticated = false;
    const refreshToken = req.signedCookies.refreshToken;
    try {
      const { payload } = await jose.jwtVerify<{
        userId: number;
      }>(refreshToken, refreshTokenSecret, {
        audience: FRONTEND_HOST,
        issuer: FRONTEND_HOST,
      });

      const newAuthToken = await new jose.SignJWT({
        sub: payload.sub,
        userId: payload.userId,
      })
        .setProtectedHeader({
          alg: 'HS256',
        })
        .setIssuedAt()
        .setIssuer(FRONTEND_HOST)
        .setAudience(FRONTEND_HOST)
        .setExpirationTime('60s')
        .sign(secret);

      res.cookie('authToken', newAuthToken, {
        httpOnly: true,
        // sameSite: '',
        // secure: ''
        signed: true,
      });

      req.isAuthenticated = true;
      req.userId = payload.userId;
    } catch (rfError) {
      req.isAuthenticated = false;
    }
  }
  next();
}
