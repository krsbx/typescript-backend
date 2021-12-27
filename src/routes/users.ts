import { Router } from 'express';
const router = Router();
import user from '../middlewares/users';

router.get('/', user.authMw);

export default router;
