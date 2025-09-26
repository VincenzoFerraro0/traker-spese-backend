// scripts/fetchExchangeRates.js
import mongoose from "mongoose";
import ExchangeRate from "../models/ExchangeRate.js";

import dotenv from "dotenv";
dotenv.config();  

// VARIABILI GLOBALI
const API_KEY = process.env.CURRENCY_API_KEY;
const BASE_URL = "https://api.currencyapi.com/v3/historical";
const BASE = "EUR";

// FUNZIONE DI RITARDO
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

async function fetchRatesForDate(date) {
  const url = `${BASE_URL}?apikey=${API_KEY}&date=${date}&base_currency=${BASE}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Errore API: ${res.statusText}`);
  const data = await res.json();
  return data.data; // mappa { "USD": {value: ...}, "GBP": {value: ...}, ... }
}

async function saveRates(date, rates) {
  const mapped = {};
  for (const [currency, info] of Object.entries(rates)) {
    mapped[currency] = info.value;
  }
  await ExchangeRate.updateOne(
    { date: new Date(date) },
    { base: BASE, rates: mapped, date: new Date(date) },
    { upsert: true }
  );
}

async function run() {
  await mongoose.connect(process.env.MONGO_URI);

  const today = new Date();
  for (let i = 0; i <= 300; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];

    try {
      console.log(`📅 Fetching rates for ${dateStr}...`);
      const rates = await fetchRatesForDate(dateStr);
      await saveRates(dateStr, rates);
      console.log(`✅ Salvato ${dateStr}`);
    } catch (err) {
      console.error(`❌ Errore su ${dateStr}:`, err.message);
    }

    // Rispetta il limite (6/min = 1 ogni 10s)
    await delay(10 * 1000);
  }

  mongoose.disconnect();
}

run();
