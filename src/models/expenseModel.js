import mongoose from 'mongoose';

const {Schema, model} = mongoose;

/** =====================================
 *  Schema ConvertedAmount (per expenseModel)
 *  =====================================
 */
const ConvertedAmountSchema = new Schema({
  currency: { type: String, required: true, enum: allowedCurrencies },
  amount: { type: Number, required: true }
}, { _id: false });

const allowedCurrencies = [
  "ADA", "AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARB", "ARS", "AUD", "AVAX", "AWG", "AZN", "BAM", "BBD", "BDT",
  "BGN", "BHD", "BIF", "BMD", "BNB", "BND", "BOB", "BRL", "BSD", "BTC", "BTN", "BWP", "BYN", "BYR", "BZD", "CAD",
  "CDF", "CHF", "CLF", "CLP", "CNY", "COP", "CRC", "CUC", "CUP", "CVE", "CZK", "DAI", "DJF", "DKK", "DOP", "DOT",
  "DZD", "EGP", "ERN", "ETB", "ETH", "EUR", "FJD", "FKP", "GBP", "GEL", "GGP", "GHS", "GIP", "GMD", "GNF", "GTQ",
  "GYD", "HKD", "HNL", "HRK", "HTG", "HUF", "IDR", "ILS", "IMP", "INR", "IQD", "IRR", "ISK", "JEP", "JMD", "JOD",
  "JPY", "KES", "KGS", "KHR", "KMF", "KPW", "KRW", "KWD", "KYD", "KZT", "LAK", "LBP", "LKR", "LRD", "LSL", "LTC",
  "LTL", "LVL", "LYD", "MAD", "MATIC", "MDL", "MGA", "MKD", "MMK", "MNT", "MOP", "MRO", "MRU", "MUR", "MVR", "MWK",
  "MXN", "MYR", "MZN", "NAD", "NGN", "NIO", "NOK", "NPR", "NZD", "OMR", "OP", "PAB", "PEN", "PGK", "PHP", "PKR",
  "PLN", "PYG", "QAR", "RON", "RSD", "RUB", "RWF", "SAR", "SBD", "SCR", "SDG", "SEK", "SGD", "SHP", "SLE", "SLL",
  "SOL", "SOS", "SRD", "STD", "STN", "SVC", "SYP", "SZL", "THB", "TJS", "TMT", "TND", "TOP", "TRX", "TRY", "TTD",
  "TWD", "TZS", "UAH", "UGX", "USD", "USDC", "USDT", "UYU", "UZS", "VEF", "VES", "VND", "VUV", "WST", "XAF", "XAG",
  "XAU", "XCD", "XCG", "XDR", "XOF", "XPD", "XPF", "XPT", "XRP", "YER", "ZAR", "ZMK", "ZMW", "ZWG", "ZWL"
];

/** =====================================
 *  Schema Expense
 *  =====================================
 */
const ExpenseSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  expenseDate: { type: Date, required: true },
  amount: { type: Number, required: true },
  currency: {
    type: [String],
    required: true,
    enum: allowedCurrencies,
    validate: {
      validator: function(v) {
        return v.length > 0; // almeno una valuta deve essere selezionata
      },
      message: props => `Devi selezionare almeno una valuta.`
    }
  },
  convertedAmounts: [ConvertedAmountSchema],
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
}, { timestamps: true });

export default model('expenseModel', ExpenseSchema);
