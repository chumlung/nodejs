import { Router } from 'express';
import HttpStatus from 'http-status-codes';
import * as todoService from '../services/todoService';
import { checkAccessToken } from '../middlewares/checkToken';
import { findTodo, todoValidator } from '../validators/todoValidator';

const router = Router();

/**
 * GET /api/users/:id/todos
 */
router.get('/', (req, res, next) => {
  todoService
    .getAllTodos(req.body.userID)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});
router.get('/search', (req, res, next) => {
  let page = 1;
  if (req.query.page) {
    page = req.query.page;
  }
  if (req.query.searchValue) {
    todoService
      .getSearchedTodo(req.body.userID, req.query.searchValue, page)
      .then(data => res.json({ data, metadata: data.pagination }))
      .catch(err => next(err));
  } else {
    res.send('nothing to search for');
  }
});

/**
 * GET /api/todos/:id
 */
router.get('/:id', checkAccessToken, (req, res, next) => {
  todoService
    .getTodo(req.params.id)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

/**
 * POST /api/users/:id/todos
 */
router.post('/', checkAccessToken, (req, res, next) => {
  todoService
    .createTodo(req.body)
    .then(data => res.status(HttpStatus.CREATED).json({ data }))
    .catch(err => next(err));
});

/**
 * PUT /api/users/:id/todos/:id
 */
router.put('/:id', findTodo, todoValidator, (req, res, next) => {
  todoService
    .updateTodo(req.params.id, req.body)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

/**
 * DELETE /api/todos/:id
 */
router.delete('/:id', findTodo, (req, res, next) => {
  todoService
    .deleteTodo(req.params.id)
    .then(data => res.status(HttpStatus.NO_CONTENT).json({ data }))
    .catch(err => next(err));
});

export default router;
