import _ from 'lodash';
import { verifyAccessToken } from '../utils/jwt';
import { generateToken } from '../utils/jwt';
import encryption from '../utils/encryption';
import repository from '../repository';

export const loginMw = async (req: any, res: any) => {
  try {
    const user = await repository.user.findOne({ email: req.body.email });

    if (!user) return res.status(404).json({ message: 'User not found!' });

    const isMatch = await encryption.compare(req.body.password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Wrong password!' });

    const newToken = generateToken(_.pick(user, ['id']));

    return res.json({
      token: newToken.accessToken,
      id: user.id,
    });
  } catch (err) {
    return res.status(400).json({ message: 'Wrong credentials!' });
  }
};

export default { loginMw };
