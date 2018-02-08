/* eslint-disable prettier/prettier */
import { Router } from 'express';
import HttpStatus from 'http-status-codes';
import * as categoryService from '../services/categoryService';
import { findCategory, categoryValidator } from '../validators/categoryValidator';
import todoController from './todo';
// import refreshController from '../controllers/refresh';
const router = Router();

/**
 * GET /api/categorys/categories
 */
router.get('/', (req, res, next) => {
  categoryService
    .getAllCategories(req.body.userID)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

/**
 * GET /api/categorys/:id/categories/:id
 */
router.get('/:id', (req, res, next) => {
  categoryService
    .getCategory(req.params.id)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

/**
 * POST /api/categorys/categories
 */
router.post('/', categoryValidator, (req, res, next) => {
  categoryService
    .createCategory(req.body)
    .then(data => res.status(HttpStatus.CREATED).json({ data }))
    .catch(err => next(err));
});

/**
 * PUT /api/categorys/:id
 */
router.put('/:id', findCategory, categoryValidator, (req, res, next) => {
  categoryService
    .updateCategory(req.params.id, req.body)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

/**
 * DELETE /api/categorys/:id
 */
router.delete('/:id', findCategory, (req, res, next) => {
  categoryService
    .deleteCategory(req.params.id)
    .then(data => res.status(HttpStatus.NO_CONTENT).json({ data }))
    .catch(err => next(err));
});

router.use('/:id/todos', findCategory, (req, res, next) => {
  req.body.categoryID = req.params.id;
  next();
}, todoController);

// router.use('/:id/refresh',findCategory,(req,res,next)=>{
//   req.body.categoryID = req.params.id;
//   next();
// },refreshController);

export default router;
