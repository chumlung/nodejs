import Joi from 'joi';
import validate from '../utils/validate';
import * as todoService from '../services/todoService';

const SCHEMA = {
  details: Joi.string()
    .label('Details')
    .max(200)
    .required(),

  userID: Joi.number()
    .integer()
    .label('userID')
};

/**
 * Validate create/update todo request.
 *
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 * @return {Promise}
 */
function todoValidator(req, res, next) {
  return validate(req.body, SCHEMA)
    .then(() => next())
    .catch(err => next(err));
}

/**
 * Validate todos existence.
 *
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 * @return {Promise}
 */
function findTodo(req, res, next) {
  return todoService
    .getTodo(req.params.id)
    .then(() => next())
    .catch(err => next(err));
}

export { findTodo, todoValidator };
