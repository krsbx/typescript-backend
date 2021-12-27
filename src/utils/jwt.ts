import jwtToken, { VerifyCallback, Jwt } from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET || 'secret';

interface IVerify extends VerifyCallback {
  (err: any, decoded: Jwt & { id: number }): void;
}

export const signAccessToken = (payload: any) =>
  jwtToken.sign(payload, jwtSecret);

export const verifyAccessToken = (token: string, onComplete: IVerify) =>
  jwtToken.verify(token, jwtSecret, onComplete);

export const generateToken = (payload: any) => ({
  accessToken: signAccessToken(payload),
});

export default {
  signAccessToken,
  verifyAccessToken,
};
