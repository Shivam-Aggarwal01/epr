import express from 'express';
import { listItems, createItem, deleteItem } from '../controllers/itemsController.js';
import { requireAuth } from '../middleware/auth.js';

export default function createItemsRouter(opts = {}) {
  const router = express.Router();

  router.get('/', async (req, res) => {
    return listItems(req, res, { dbConnected: opts.getDbStatus ? opts.getDbStatus() : false });
  });

  // Protected: create
  router.post('/', requireAuth, async (req, res) => {
    return createItem(req, res, { dbConnected: opts.getDbStatus ? opts.getDbStatus() : false });
  });

  router.delete('/:id', requireAuth, async (req, res) => {
    return deleteItem(req, res, { dbConnected: opts.getDbStatus ? opts.getDbStatus() : false });
  });

  return router;
}
