import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default function createCollegesRouter() {
  const router = express.Router();

  router.get('/', (req, res) => {
    const file = path.join(__dirname, '..', 'data', 'pu_colleges.json');
    try {
      const raw = fs.readFileSync(file, 'utf-8');
      const json = JSON.parse(raw);
      return res.json({ colleges: json });
    } catch (err) {
      console.error('Failed to read colleges file', err);
      return res.status(500).json({ message: 'Unable to load colleges', error: err.message });
    }
  });

  router.get('/debug', (req, res) => {
    const file = path.join(__dirname, '..', 'data', 'pu_colleges.json');
    try {
      const exists = fs.existsSync(file);
      const stat = exists ? fs.statSync(file) : null;
      const raw = exists ? fs.readFileSync(file, 'utf-8') : null;
      return res.json({ file, exists, stat, rawSample: raw ? raw.slice(0, 200) : null });
    } catch (err) {
      console.error('Debug read failed', err);
      return res.status(500).json({ message: 'debug fail', error: err.message });
    }
  });

  return router;
}
