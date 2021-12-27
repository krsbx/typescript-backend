import _ from 'lodash';
import { Request, Response, NextFunction } from 'express';
// @ts-ignore
import asyncMw from 'async-express-mw';
import { verifyAccessToken } from '../utils/jwt';
import repository from '../repository';

// Need to extend the Request interface to add the user property

export const authMw = asyncMw(
  async (req: Request, res: Response, next: NextFunction) => {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) return res.status(401);

    const accessToken = authorizationHeader.split(' ')[1];

    verifyAccessToken(accessToken, async (err, payload) => {
      if (err) return res.status(401).json({ message: 'Unauthorized' });

      // @ts-ignore
      req.userAuth = await repository.user.findOne(payload?.id);

      return next();
    });
  }
);

export default { authMw };
