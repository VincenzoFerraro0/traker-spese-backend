import mongoose from 'mongoose';

const {Schema, model} = mongoose;
 
const CategorySchema = new Schema({
  name: { type: String, required: true },
  parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null }
}, { timestamps: true });

export default model('Category', CategorySchema);

// 🔹 Note:
// name → il nome della categoria, obbligatorio.
// parentCategory → riferimento opzionale a un’altra categoria (null se è una categoria principale).
// timestamps: true → genera createdAt e updatedAt.