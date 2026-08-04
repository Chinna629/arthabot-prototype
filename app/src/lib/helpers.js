export function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

// Income bucket table (monthly ₹ income → score)
export function scoreIncome(income) {
  if (income < 20000) return 15;
  if (income < 40000) return 25;
  if (income < 60000) return 50;
  if (income < 80000) return 75;
  return 100;
}

// Expense-to-income ratio bucket table
export function scoreExpenses(expenses, income) {
  if (!income) return 0;
  const ratioPct = (expenses / income) * 100;
  if (ratioPct < 20) return 100;
  if (ratioPct < 40) return 85;
  if (ratioPct < 60) return 50;
  if (ratioPct < 80) return 15;
  return 5;
}

// (Savings + Goals monthly commitments) combined, as a % of income — bucket table
// Shared bucket table — a ratio-to-income percentage mapped to a 0-100 score.
// Used identically for Savings and for Goals (each measured against income separately).
export function ratioBucketScore(ratioPct) {
  if (ratioPct > 70) return 100;
  if (ratioPct >= 50) return 80;
  if (ratioPct >= 40) return 70;
  if (ratioPct >= 30) return 60;
  if (ratioPct >= 20) return 50;
  if (ratioPct >= 10) return 30;
  if (ratioPct >= 1) return 15;
  return 0;
}

export function scoreSavings(savings, income) {
  if (!income) return 0;
  return ratioBucketScore((savings / income) * 100);
}

export function scoreGoals(goals, income) {
  if (!income) return 0;
  const goalMonthlyTotal = goals.reduce((s, g) => s + (g.monthly || 0), 0);
  return ratioBucketScore((goalMonthlyTotal / income) * 100);
}

export function computeScores(finances, goals) {
  const { income, savings, expenses } = finances;
  return {
    incomeLabel: scoreIncome(income),
    savingsLabel: scoreSavings(savings, income),
    goalsLabel: scoreGoals(goals, income),
    expensesLabel: scoreExpenses(expenses, income),
  };
}
