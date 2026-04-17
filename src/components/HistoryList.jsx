import { useState } from 'react';
import { Card, Form, InputGroup } from 'react-bootstrap';
import { useTransactions } from '../hooks/useTransactions';
import { exportCSV } from '../utils/exportUtils';

const CAT_EMOJI  = { General:'💼', Groceries:'🛒', Travel:'✈️', Bills:'🧾', Entertainment:'🎬', Food:'🍜', Health:'💊', Shopping:'🛍️' };
const CAT_COLOR  = { General:'#9b98b0', Groceries:'#22c55e', Travel:'#7c5cfc', Bills:'#ef4444', Entertainment:'#f59e0b', Food:'#f97316', Health:'#06b6d4', Shopping:'#ec4899' };
const ALL_TAGS   = ['General','Groceries','Travel','Bills','Entertainment','Food','Health','Shopping'];

const HistoryList = () => {
  const { transactions, removeEntry } = useTransactions();
  const [search,    setSearch]    = useState('');
  const [filterTag, setFilterTag] = useState('');
  const [sortBy,    setSortBy]    = useState('date');

  let list = [...transactions];
  if (search)    list = list.filter(t => t.text.toLowerCase().includes(search.toLowerCase()));
  if (filterTag) list = list.filter(t => t.tag === filterTag);
  if (sortBy === 'asc')  list.sort((a, b) => Math.abs(a.amount) - Math.abs(b.amount));
  if (sortBy === 'desc') list.sort((a, b) => Math.abs(b.amount) - Math.abs(a.amount));

  return (
    <Card className="spendle-card h-100" id="history">
      <Card.Body className="d-flex flex-column">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <Card.Title className="spendle-card__title mb-0">
            Transaction History
            <span className="tx-count ms-2">{list.length}</span>
          </Card.Title>
          <button className="export-btn" onClick={() => exportCSV(transactions)}>⬇ CSV</button>
        </div>

        <div className="tx-filters mb-3">
          <InputGroup size="sm">
            <InputGroup.Text className="filter-icon">🔍</InputGroup.Text>
            <Form.Control
              placeholder="Search..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="spendle-input"
            />
          </InputGroup>
          <Form.Select size="sm" value={filterTag} onChange={e => setFilterTag(e.target.value)} className="spendle-input">
            <option value="">All tags</option>
            {ALL_TAGS.map(t => <option key={t} value={t}>{t}</option>)}
          </Form.Select>
          <Form.Select size="sm" value={sortBy} onChange={e => setSortBy(e.target.value)} className="spendle-input">
            <option value="date">Newest</option>
            <option value="desc">Highest</option>
            <option value="asc">Lowest</option>
          </Form.Select>
        </div>

        <div className="tx-list flex-grow-1">
          {list.length === 0 ? (
            <div className="tx-empty">
              <div className="tx-empty__icon">📋</div>
              <div>No transactions found</div>
            </div>
          ) : (
            list.map(tx => (
              <div key={tx.id} className="tx-item">
                <div className="tx-emoji" style={{ background: (CAT_COLOR[tx.tag] || '#9b98b0') + '22' }}>
                  {CAT_EMOJI[tx.tag] || '💼'}
                </div>
                <div className="tx-info">
                  <div className="tx-name">{tx.text}</div>
                  <div className="tx-meta">
                    <span className="tx-tag" style={{ color: CAT_COLOR[tx.tag] || '#9b98b0' }}>{tx.tag}</span>
                    <span className="tx-date">{tx.date}</span>
                  </div>
                </div>
                <div className="tx-amount" style={{ color: tx.amount >= 0 ? '#22c55e' : '#ef4444' }}>
                  {tx.amount >= 0 ? '+' : ''}₹{Math.abs(tx.amount).toLocaleString('en-IN')}
                </div>
                <button className="tx-delete" onClick={() => removeEntry(tx.id)} aria-label="Delete">✕</button>
              </div>
            ))
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default HistoryList;
