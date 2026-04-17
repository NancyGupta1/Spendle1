/**
 * exportUtils.js
 * Handles CSV and plain-text export of transaction data.
 */

export const exportCSV = (transactions) => {
  if (!transactions.length) return;
  const headers = ['Date', 'Description', 'Category', 'Type', 'Amount'];
  const rows = transactions.map(t => [
    t.date,
    `"${t.text.replace(/"/g, '""')}"`,
    t.tag,
    t.amount >= 0 ? 'Income' : 'Expense',
    Math.abs(t.amount),
  ]);
  const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
  triggerDownload(csv, 'text/csv', 'spendle_transactions.csv');
};

export const exportSummaryText = (income, expense, balance) => {
  const fmt = n => '₹' + Math.round(n).toLocaleString('en-IN');
  return [
    '=== Spendle Summary ===',
    `Income  : ${fmt(income)}`,
    `Expense : ${fmt(expense)}`,
    `Balance : ${fmt(balance)}`,
    `Date    : ${new Date().toLocaleDateString('en-IN')}`,
  ].join('\n');
};

const triggerDownload = (content, mimeType, filename) => {
  const blob = new Blob([content], { type: mimeType });
  const url  = URL.createObjectURL(blob);
  const a    = Object.assign(document.createElement('a'), { href: url, download: filename });
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};
