import { Router } from 'express';
import user from '../middlewares/users';
import token from '../middlewares/tokens';
const router = Router();

router.get('/', user.authMw);
router.post('/login', token.loginMw);

export default router;
