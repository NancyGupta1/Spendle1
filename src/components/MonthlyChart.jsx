import { useState, useMemo } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart, CategoryScale, LinearScale, BarElement,
  ArcElement, Title, Tooltip, Legend,
} from 'chart.js';
import { useTransactions } from '../hooks/useTransactions';

Chart.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const CAT_COLORS = {
  General:       '#C8F135',
  Groceries:     '#FFD166',
  Travel:        '#6ee7b7',
  Bills:         '#f87171',
  Entertainment: '#fbbf24',
  Food:          '#86efac',
  Health:        '#34d399',
  Shopping:      '#a3e635',
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

  const isDark      = document.documentElement.getAttribute('data-theme') !== 'light';
  const axisColor   = isDark ? '#7A7B6F' : '#8a8e74';
  const legendColor = isDark ? '#7A7B6F' : '#6b6e58';
  const pieEdge     = isDark ? '#161711' : '#f3f4ec';
  const gridColor   = isDark ? 'rgba(200,241,53,0.06)' : 'rgba(90,122,8,0.07)';

  const barData = useMemo(() => ({
    labels: MONTHS,
    datasets: [
      {
        label: 'Income',
        data: monthlyData('income'),
        backgroundColor: '#C8F135',
        _gradientColors: ['#C8F135', '#9ab82a'],
        borderRadius: 8,
        borderSkipped: false,
        barPercentage: 0.45,
      },
      {
        label: 'Expense',
        data: monthlyData('expense'),
        backgroundColor: '#FFD166',
        _gradientColors: ['#FFD166', '#d4a832'],
        borderRadius: 8,
        borderSkipped: false,
        barPercentage: 0.45,
      },
    ],
  }), [transactions]); // eslint-disable-line react-hooks/exhaustive-deps

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: isDark ? '#1A1B14' : '#ffffff',
        borderColor: isDark ? 'rgba(200,241,53,0.18)' : 'rgba(90,122,8,0.15)',
        borderWidth: 1,
        titleColor: isDark ? '#F5F4EE' : '#1A1B14',
        bodyColor: isDark ? '#7A7B6F' : '#6b6e58',
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

  const pieData = useMemo(() => {
    const cats = Object.keys(categoryTotals);
    return {
      labels: cats,
      datasets: [{
        data: cats.map(c => Math.round(categoryTotals[c])),
        backgroundColor: cats.map(c => CAT_COLORS[c] || '#C8F135'),
        borderWidth: 2,
        borderColor: pieEdge,
        hoverOffset: 8,
      }],
    };
  }, [transactions, pieEdge]); // eslint-disable-line react-hooks/exhaustive-deps

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
        backgroundColor: isDark ? '#1A1B14' : '#ffffff',
        borderColor: isDark ? 'rgba(200,241,53,0.18)' : 'rgba(90,122,8,0.15)',
        borderWidth: 1,
        titleColor: isDark ? '#F5F4EE' : '#1A1B14',
        bodyColor: isDark ? '#7A7B6F' : '#6b6e58',
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
            <span className="chart-legend__dot" style={{ background: '#C8F135' }} />Income
          </span>
          <span className="chart-legend__item">
            <span className="chart-legend__dot" style={{ background: '#FFD166' }} />Expense
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