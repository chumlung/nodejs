/**
 * Created by Chumlung on 12/12/2017.
 */
import jwt from 'jsonwebtoken';
import { Router } from 'express';
import * as checkToken from '../middlewares/checkToken';
import { checkRefreshToken } from '../middlewares/checkToken';

const router = Router();
// get /api/users/id/refresh
router.get('/', (req, res, next) => {
  checkRefreshToken(req ,res , next);
})
export default router;
