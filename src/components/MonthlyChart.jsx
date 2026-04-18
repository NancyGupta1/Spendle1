import { useState, useMemo } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart, CategoryScale, LinearScale, BarElement,
  ArcElement, Title, Tooltip, Legend,
} from 'chart.js';
import { useTransactions } from '../hooks/useTransactions';

Chart.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const CAT_COLORS = {
  General: '#7c5cfc', Groceries: '#22d3ee', Travel: '#d63af9',
  Bills: '#f87171',   Entertainment: '#fbbf24', Food: '#f472b6',
  Health: '#34d399',  Shopping: '#a78bfa',
};

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

if (!Chart.registry.plugins.get('customGradient')) {
  Chart.register({
    id: 'customGradient',
    beforeDatasetDraw(chart, args) {
      const ds = chart.data.datasets[args.index];
      if (!ds._gradientColors) return;
      const { ctx, chartArea: { top, bottom } } = chart;
      const grad = ctx.createLinearGradient(0, top, 0, bottom);
      grad.addColorStop(0, ds._gradientColors[0]);
      grad.addColorStop(1, ds._gradientColors[1]);
      ds.backgroundColor = grad;
    },
  });
}

const MonthlyChart = () => {
  const { transactions, monthlyData, categoryTotals } = useTransactions();
  const [activeTab, setActiveTab] = useState('bar');

  // ── ADDED: read theme on each render ──
  const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
  const axisColor  = isDark ? '#6666aa' : '#9b98b0';
  const legendColor = isDark ? '#8888bb' : '#6b7280';
  const pieEdge    = isDark ? '#151530' : '#f0eeff';
  const gridColor  = isDark ? 'rgba(120,100,200,0.12)' : 'rgba(124,92,252,0.08)';

  const barData = useMemo(() => ({
    labels: MONTHS,
    datasets: [
      {
        label: 'Income',
        data: monthlyData('income'),
        backgroundColor: '#7c5cfc',
        _gradientColors: ['#7c5cfc', '#5c3cdc'],
        borderRadius: 8,
        borderSkipped: false,
        barPercentage: 0.45,
      },
      {
        label: 'Expense',
        data: monthlyData('expense'),
        backgroundColor: '#d63af9',
        _gradientColors: ['#d63af9', '#a020c0'],
        borderRadius: 8,
        borderSkipped: false,
        barPercentage: 0.45,
      },
    ],
  }), [transactions]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── CHANGED: axisColor + gridColor replace hardcoded values ──
  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: { label: ctx => ' ₹' + ctx.parsed.y.toLocaleString('en-IN') },
      },
    },
    scales: {
      x: {
        ticks: { color: axisColor, font: { size: 11 } },
        grid: { color: gridColor },
        border: { color: 'transparent' },
      },
      y: {
        ticks: {
          color: axisColor,
          font: { size: 11 },
          callback: v => '₹' + v.toLocaleString('en-IN'),
        },
        grid: { color: gridColor },
        border: { color: 'transparent' },
      },
    },
  };

  // ── CHANGED: pieEdge replaces hardcoded '#151530' ──
  const pieData = useMemo(() => {
    const cats = Object.keys(categoryTotals);
    return {
      labels: cats,
      datasets: [{
        data: cats.map(c => Math.round(categoryTotals[c])),
        backgroundColor: cats.map(c => CAT_COLORS[c] || '#7c5cfc'),
        borderWidth: 2,
        borderColor: pieEdge,
        hoverOffset: 8,
      }],
    };
  }, [transactions, pieEdge]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── CHANGED: legendColor replaces hardcoded '#8888bb' ──
  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '62%',
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: legendColor,
          font: { size: 12 },
          boxWidth: 12,
          padding: 10,
          generateLabels: chart => chart.data.labels.map((label, i) => ({
            text: label + '  ₹' + (chart.data.datasets[0].data[i] || 0).toLocaleString('en-IN'),
            fillStyle: chart.data.datasets[0].backgroundColor[i],
            index: i,
          })),
        },
      },
      tooltip: {
        callbacks: { label: ctx => ' ₹' + ctx.parsed.toLocaleString('en-IN') },
      },
    },
  };

  return (
    <div className="chart-panel" id="chart">
      <div className="chart-panel__header">
        <h5 className="chart-panel__title">Analytics</h5>
        <div className="chart-tabs">
          <button
            className={`chart-tab ${activeTab === 'bar' ? 'chart-tab--active' : ''}`}
            onClick={() => setActiveTab('bar')}
          >Monthly</button>
          <button
            className={`chart-tab ${activeTab === 'pie' ? 'chart-tab--active' : ''}`}
            onClick={() => setActiveTab('pie')}
          >By Category</button>
        </div>
      </div>

      {activeTab === 'bar' && (
        <div className="chart-legend">
          <span className="chart-legend__item">
            <span className="chart-legend__dot" style={{ background: '#7c5cfc' }} />Income
          </span>
          <span className="chart-legend__item">
            <span className="chart-legend__dot" style={{ background: '#d63af9' }} />Expense
          </span>
        </div>
      )}

      <div style={{ position: 'relative', height: '260px', width: '100%' }}>
        {!transactions.length ? (
          <div className="chart-empty">
            <div className="chart-empty__icon">📊</div>
            <div>Add transactions to see analytics</div>
          </div>
        ) : activeTab === 'bar' ? (
          <Bar
            key={`${transactions.length}-${isDark}`}
            data={barData}
            options={barOptions}
            aria-label="Monthly income vs expense bar chart"
          />
        ) : (
          <Doughnut
            key={`${transactions.length}-${isDark}`}
            data={pieData}
            options={pieOptions}
            aria-label="Category-wise spending doughnut chart"
          />
        )}
      </div>
    </div>
  );
};

export default MonthlyChart;