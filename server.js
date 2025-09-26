import express from 'express';
import mongoose from 'mongoose';

const app = express();

app.use(express.json());

// Connessione a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('database MongoDB connesso ✅'))
  .catch(err => console.error(err));



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server in esecuzione sulla porta 🚀 ${PORT}`));
