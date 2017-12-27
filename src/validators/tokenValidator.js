/**
 * Created by Chumlung on 12/12/2017.
 */
function tokenValidator(req, res, next) {
  let token = req.header.Authorization;
  if (token) {
    res.send('received');
    next();
  } else {
    res.send('nono');
  }
}

export default tokenValidator;
