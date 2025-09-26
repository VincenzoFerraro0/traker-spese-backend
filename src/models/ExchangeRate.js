// src/models/ExchangeRate.js
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const ExchangeRateSchema = new Schema({
  date: { type: Date, required: true, unique: true },
  base: { type: String, required: true },
  rates: { type: Map, of: Number, required: true }
}, { timestamps: true });

export default model('ExchangeRate', ExchangeRateSchema);
