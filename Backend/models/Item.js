import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
  name: String,
  eeeCode: String,
  quantity: Number,
  location: String,
  eprCode: String,
  dateAdded: String,
  status: String,
  images: [String],
  serialNumber: String,
  modelNumber: String,
  collegeId: String,
  departmentId: String,
}, { timestamps: true });

const Item = mongoose.models.Item || mongoose.model('Item', ItemSchema);
export default Item;
