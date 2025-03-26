import { NowRequest, NowResponse } from '@vercel/node';
import path from 'path';
import fs from 'fs';

// load rate data (stored locally in /api/data/rates.json)
const ratesPath = path.join(__dirname, 'data', 'rates.json');
const rates = JSON.parse(fs.readFileSync(ratesPath, 'utf-8'));

export default function handler(req: NowRequest, res: NowResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { supplier, category, role, level, start_date, end_date } = req.body;

  const key = `${supplier}|||${category}|||${role}|||${level}`;
  const record = rates[key];

  if (!record) {
    return res.status(400).json({ error: 'Rate not found' });
  }

  const { rates: yearlyRates, discount_1y, discount_2y } = record;

  const start = new Date(start_date);
  const end = new Date(end_date);
  const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());

  if (months <= 0) {
    return res.status(400).json({ error: 'Invalid date range' });
  }

  const monthlyRates = yearlyRates.map(r => r / 12);
  let total = 0;
  for (let i = 0; i < months; i++) {
    const year = Math.min(Math.floor(i / 12), 5); // cap at year 6
    total += monthlyRates[year];
  }

  let discount = 0;
  if (months >= 24) {
    discount = discount_2y;
  } else if (months >= 12) {
    discount = discount_1y;
  }

  const discountedTotal = total * (1 - discount / 100);

  res.json({
    total_cost_before_discount: Number(total.toFixed(2)),
    discount_percent: discount,
    total_cost_after_discount: Number(discountedTotal.toFixed(2))
  });
}
