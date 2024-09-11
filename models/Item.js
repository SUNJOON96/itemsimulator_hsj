// models/Item.js
import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  item_code: { type: Number, required: true, unique: true },
  item_name: { type: String, required: true },
  item_stat: { type: Object, required: true },
  item_price: { type: Number, required: true },
});

const Item = mongoose.model('Item', itemSchema);

export default Item;
