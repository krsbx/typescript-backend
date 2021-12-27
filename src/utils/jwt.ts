import jwtToken, { VerifyCallback, Jwt } from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET || 'secret';

interface IVerify extends VerifyCallback {
  (err: any, decoded: Jwt & { id: number }): void;
}

export const signAccessToken = (payload: string) =>
  jwtToken.sign(payload, jwtSecret);

export const verifyAccessToken = (token: string, onComplete: IVerify) =>
  jwtToken.verify(token, jwtSecret, onComplete);

export default {
  signAccessToken,
  verifyAccessToken,
};
