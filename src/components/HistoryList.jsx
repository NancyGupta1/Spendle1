import { useState } from 'react';
import { useTransactions } from '../hooks/useTransactions';
import { exportCSV } from '../utils/exportUtils';

const CAT_EMOJI  = { General:'💼', Groceries:'🛒', Travel:'✈️', Bills:'🧾', Entertainment:'🎬', Food:'🍜', Health:'💊', Shopping:'🛍️' };
const CAT_BG     = { General:'#9b98b022', Groceries:'#22c55e22', Travel:'#7c5cfc22', Bills:'#ef444422', Entertainment:'#f59e0b22', Food:'#f9731622', Health:'#06b6d422', Shopping:'#ec489922' };
const CAT_COLOR  = { General:'#9b98b0', Groceries:'#22c55e', Travel:'#7c5cfc', Bills:'#ef4444', Entertainment:'#f59e0b', Food:'#f97316', Health:'#06b6d4', Shopping:'#ec4899' };
const ALL_TAGS   = ['General','Groceries','Travel','Bills','Entertainment','Food','Health','Shopping'];

const today     = new Date().toISOString().slice(0, 10);
const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

const dateLabel = d => d === today ? 'Today' : d === yesterday ? 'Yesterday' : d;

const groupByDate = list => {
  const groups = {};
  list.forEach(tx => {
    const label = dateLabel(tx.date);
    if (!groups[label]) groups[label] = [];
    groups[label].push(tx);
  });
  return Object.entries(groups);
};

const HistoryList = () => {
  const { transactions, removeEntry } = useTransactions();
  const [search,    setSearch]    = useState('');
  const [filterTag, setFilterTag] = useState('');
  const [sortBy,    setSortBy]    = useState('date');

  let list = transactions.filter(t =>
    t.text.toLowerCase().includes(search.toLowerCase()) &&
    (!filterTag || t.tag === filterTag)
  );
  if (sortBy === 'date') list = [...list].sort((a, b) => new Date(b.date) - new Date(a.date));
  if (sortBy === 'asc')  list = [...list].sort((a, b) => Math.abs(a.amount) - Math.abs(b.amount));
  if (sortBy === 'desc') list = [...list].sort((a, b) => Math.abs(b.amount) - Math.abs(a.amount));

  const grouped = sortBy === 'date' ? groupByDate(list) : [['', list]];

  return (
    <div className="spendle-card h-100" id="history">
      <div className="d-flex flex-column h-100 p-3">

        {/* Header */}
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h6 className="mb-0 fw-medium d-flex align-items-center gap-2">
            Transaction history
            <span className="tx-count-badge">{list.length}</span>
          </h6>
          <button className="export-btn" onClick={() => exportCSV(transactions)}>↓ Export CSV</button>
        </div>

        {/* Filters — single row */}
        <div className="tx-filters mb-3">
          <div className="tx-search-wrap">
            <span className="tx-search-icon">⌕</span>
            <input
              className="tx-search-input"
              placeholder="Search transactions..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <select className="tx-select" value={filterTag} onChange={e => setFilterTag(e.target.value)}>
            <option value="">All categories</option>
            {ALL_TAGS.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <select className="tx-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="date">Newest</option>
            <option value="desc">Highest</option>
            <option value="asc">Lowest</option>
          </select>
        </div>

        {/* List */}
        <div className="tx-list flex-grow-1">
          {list.length === 0 ? (
            <div className="tx-empty">No transactions found</div>
          ) : (
            grouped.map(([label, items]) => (
              <div key={label}>
                {label && <div className="tx-date-divider">{label}</div>}
                {items.map(tx => (
                  <div key={tx.id} className="tx-item">
                    <div className="tx-icon" style={{ background: CAT_BG[tx.tag] || '#9b98b022' }}>
                      {CAT_EMOJI[tx.tag] || '💼'}
                    </div>
                    <div className="tx-info">
                      <div className="tx-name">{tx.text}</div>
                      <div className="tx-meta">
                        <span className="tx-tag" style={{ background: CAT_BG[tx.tag], color: CAT_COLOR[tx.tag] || '#9b98b0' }}>{tx.tag}</span>
                        <span className="tx-date">{tx.date}</span>
                      </div>
                    </div>
                    <div className="tx-amount" style={{ color: tx.amount >= 0 ? '#22c55e' : '#ef4444' }}>
                      {tx.amount >= 0 ? '+' : ''}₹{Math.abs(tx.amount).toLocaleString('en-IN')}
                    </div>
                    <button className="tx-delete" onClick={() => removeEntry(tx.id)} aria-label="Delete">✕</button>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default HistoryList;