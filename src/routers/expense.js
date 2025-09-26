// src/routes/expense.js
import express from 'express';
import expenseModel from '../models/expenseModel.js';;

const router = express.Router();

// Crea spesa
router.post('/', async (req, res) => {
  try {
    const expense = new expenseModel(req.body);
    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
