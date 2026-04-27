import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

export async function login(req, res, { dbConnected }) {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Missing credentials' });

  // If DB connected, try DB-backed admin
  if (dbConnected) {
    try {
      const admin = await Admin.findOne({ username }).exec();
      if (!admin) return res.status(401).json({ message: 'Invalid credentials' });
      const ok = await bcrypt.compare(password, admin.passwordHash);
      if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
      const token = jwt.sign({ sub: admin._id, username: admin.username }, JWT_SECRET, { expiresIn: '8h' });
      return res.json({ token });
    } catch (err) {
      console.error('DB error login', err);
      return res.status(500).json({ message: 'Server error' });
    }
  }

  // Fallback: use environment admin creds
  const fallbackUser = process.env.ADMIN_USER || 'admin';
  const fallbackPass = process.env.ADMIN_PASS || 'admin123';
  const match = username === fallbackUser && password === fallbackPass;
  if (!match) return res.status(401).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '8h' });
  return res.json({ token });
}
