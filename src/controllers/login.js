/**
 * Created by Chumlung on 12/12/2017.
 */
import jwt from 'jsonwebtoken';
import { Router } from 'express';
import * as sessionService from '../services/sessionService';
import * as userService from '../services/userService';

const router = Router();

router.post('/', (req, res, next) => {
  let user = {
    user_email: req.body.user_email
  };
  userService
    .getUserUsingEmail(user.user_email)
    .then(data => {
      let accessToken = jwt.sign(user, process.env.ACCESS_SALT, {
        expiresIn: 30
      });
      let refreshToken = jwt.sign(user, process.env.REFRESH_SALT, {
        expiresIn: 3600
      });
      sessionService
        .createSession(data.attributes.id, refreshToken)
        .then(data => res.json({ data, accessToken: accessToken }))
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

export default router;
