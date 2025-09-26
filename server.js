import express from 'express';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());

// Connessione a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connesso a MongoDB');
    // Avvio del server
    app.listen(PORT, () => {
      console.log(`Server in ascolto sulla porta ${PORT}`);
    });
  })
  .catch(err => console.error(err));




