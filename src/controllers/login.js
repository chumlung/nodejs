/**
 * Created by Chumlung on 12/12/2017.
 */
import jwt from 'jsonwebtoken';
import { Router } from 'express';
import * as sessionService from '../services/sessionService';

const router = Router();

router.post('/', (req, res, next) => {
  let user = {
    user_id: req.body.user_id
  };
  let accessToken = jwt.sign(user, process.env.ACCESS_SALT, {
    expiresIn: 300
  });
  let refreshToken = jwt.sign(user, process.env.REFRESH_SALT, {
    expiresIn: 3600
  });
  sessionService
    .createSession(user.user_id, refreshToken)
    .then(data => res.send(accessToken))
    .catch(err => next(err));

});

export default router;
