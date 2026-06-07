import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import createAuthRouter from './routes/auth.js';
import createItemsRouter from './routes/items.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

let dbConnected = false;
const MONGO_URI = process.env.MONGO_URI;
if (MONGO_URI) {
	mongoose.connect(MONGO_URI, { keepAlive: true })
		.then(() => {
			dbConnected = true;
			console.log('MongoDB connected');
		})
		.catch(err => {
			console.error('MongoDB connection error:', err.message || err);
		});
}

app.get('/api/ping', (req, res) => res.json({ ok: true }));

app.use('/api/auth', createAuthRouter({ getDbStatus: () => dbConnected }));
app.use('/api/items', createItemsRouter({ getDbStatus: () => dbConnected }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
	console.error('Unhandled Rejection:', err);
});

process.on('uncaughtException', (err) => {
	console.error('Uncaught Exception:', err);
});
