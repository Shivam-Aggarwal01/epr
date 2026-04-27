import Item from '../models/Item.js';

// In-memory fallback store
let inMemory = [];

export async function listItems(req, res, { dbConnected }) {
  if (dbConnected) {
    const items = await Item.find().lean().exec();
    return res.json({ items });
  }
  return res.json({ items: inMemory });
}

export async function createItem(req, res, { dbConnected }) {
  const payload = req.body;
  if (dbConnected) {
    const item = await Item.create(payload);
    return res.status(201).json({ item });
  }
  // assign a simple id
  const id = String(Date.now());
  const item = { ...payload, _id: id };
  inMemory.push(item);
  return res.status(201).json({ item });
}

export async function deleteItem(req, res, { dbConnected }) {
  const id = req.params.id;
  if (dbConnected) {
    await Item.findByIdAndDelete(id).exec();
    return res.json({ ok: true });
  }
  inMemory = inMemory.filter(i => String(i._id) !== String(id));
  return res.json({ ok: true });
}
