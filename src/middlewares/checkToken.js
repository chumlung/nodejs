/**
 * Created by Chumlung on 12/13/2017.
 */
import jwt from 'jsonwebtoken';
import { getSession } from '../services/sessionService';
import boom from 'boom';
export function checkAccessToken(req, res, next) {
  let token = req.headers['authorization'];
  if (token) {
    jwt.verify(token, process.env.ACCESS_SALT, function(err) {
      if (err) {
        throw new boom.unauthorized('Unauthorized');
      } else {
        next();
      }
    });
  } else {
    throw new boom.badData('access token not received');
  }
}

export function checkRefreshToken(req, res, next) {
  let userId = req.body.userID;
  getSession(userId)
    .then(session => {
      let token = session.attributes.refreshToken;
      if (token) {
        jwt.verify(token, process.env.REFRESH_SALT, function(err) {
          if (err) {
            throw new boom.forbidden('refresh token expired');
          } else {
            generateAccessToken(req, res, next);
          }
        });
      } else {
        throw new boom.forbidden('not logged in');
      }
    })
    .catch(err => {
      next(err);
    });
}

function generateAccessToken(req, res, next) {
  let user = {
    user_id: req.body.user_id
  };
  let token = jwt.sign(user, process.env.ACCESS_SALT, {
    expiresIn: 300
  });
  res.json({ newAccessToken: token });
}
