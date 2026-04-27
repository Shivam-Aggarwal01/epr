import express from 'express';
import { login } from '../controllers/authController.js';

export default function createAuthRouter(opts = {}) {
  const router = express.Router();

  router.post('/login', async (req, res) => {
    return login(req, res, { dbConnected: opts.getDbStatus ? opts.getDbStatus() : false });
  });

  return router;
}
