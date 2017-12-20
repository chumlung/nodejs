/**
 * Created by Chumlung on 12/12/2017.
 */
import { Router } from 'express';
import * as sessionService from '../services/sessionService';

const router = Router();

router.delete('/:id', (req, res, next) => {
  sessionService
    .deleteSession(req.params.id)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

export default router;
