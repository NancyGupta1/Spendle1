import { useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart, CategoryScale, LinearScale, BarElement,
  ArcElement, Title, Tooltip, Legend,
} from 'chart.js';
import { useTransactions } from '../hooks/useTransactions';

Chart.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const CAT_COLORS = {
  General:'#9b98b0', Groceries:'#22c55e', Travel:'#7c5cfc',
  Bills:'#ef4444', Entertainment:'#f59e0b', Food:'#f97316',
  Health:'#06b6d4', Shopping:'#ec4899',
};
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const MonthlyChart = () => {
  const { transactions, monthlyData, categoryTotals } = useTransactions();
  const [activeTab, setActiveTab] = useState('bar');

  const barData = {
    labels: MONTHS,
    datasets: [
      { label: 'Income',  data: monthlyData('income'),  backgroundColor: 'rgba(34,197,94,0.7)',  borderRadius: 6, borderSkipped: false },
      { label: 'Expense', data: monthlyData('expense'), backgroundColor: 'rgba(239,68,68,0.7)',  borderRadius: 6, borderSkipped: false },
    ],
  };

  const barOptions = {
    responsive: true, maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { callbacks: { label: ctx => ' ₹' + ctx.parsed.y.toLocaleString('en-IN') } },
    },
    scales: {
      x: { ticks: { color: '#9b98b0', font: { size: 11 } }, grid: { color: 'rgba(128,128,128,0.08)' } },
      y: { ticks: { color: '#9b98b0', font: { size: 11 }, callback: v => '₹' + v.toLocaleString('en-IN') }, grid: { color: 'rgba(128,128,128,0.08)' } },
    },
  };

  const cats = Object.keys(categoryTotals);
  const pieData = {
    labels: cats,
    datasets: [{
      data: cats.map(c => Math.round(categoryTotals[c])),
      backgroundColor: cats.map(c => CAT_COLORS[c] || '#9b98b0'),
      borderWidth: 2, borderColor: 'rgba(0,0,0,0.15)', hoverOffset: 8,
    }],
  };

  const pieOptions = {
    responsive: true, maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#9b98b0', font: { size: 12 }, boxWidth: 14, padding: 12,
          generateLabels: chart => chart.data.labels.map((label, i) => ({
            text: label + '  ₹' + (chart.data.datasets[0].data[i] || 0).toLocaleString('en-IN'),
            fillStyle: chart.data.datasets[0].backgroundColor[i],
            index: i,
          })),
        },
      },
      tooltip: { callbacks: { label: ctx => ' ₹' + ctx.parsed.toLocaleString('en-IN') } },
    },
    cutout: '62%',
  };

  return (
    <div className="chart-panel" id="chart">
      <div className="chart-panel__header">
        <h5 className="chart-panel__title">Analytics</h5>
        <div className="chart-tabs">
          <button className={`chart-tab ${activeTab === 'bar' ? 'chart-tab--active' : ''}`} onClick={() => setActiveTab('bar')}>Monthly</button>
          <button className={`chart-tab ${activeTab === 'pie' ? 'chart-tab--active' : ''}`} onClick={() => setActiveTab('pie')}>By Category</button>
        </div>
      </div>

      {activeTab === 'bar' && (
        <div className="chart-legend">
          <span className="chart-legend__item"><span className="chart-legend__dot" style={{ background: 'rgba(34,197,94,0.7)' }} />Income</span>
          <span className="chart-legend__item"><span className="chart-legend__dot" style={{ background: 'rgba(239,68,68,0.7)' }} />Expense</span>
        </div>
      )}

      <div style={{ position: 'relative', height: '240px', width: '100%' }}>
        {!transactions.length ? (
          <div className="chart-empty"><div className="chart-empty__icon">📊</div><div>Add transactions to see analytics</div></div>
        ) : activeTab === 'bar' ? (
          <Bar data={barData} options={barOptions} aria-label="Monthly income vs expense bar chart" />
        ) : (
          <Doughnut data={pieData} options={pieOptions} aria-label="Category-wise spending doughnut chart" />
        )}
      </div>
    </div>
  );
};

export default MonthlyChart;
