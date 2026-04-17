// `Loginpage.jsx`

import { useState } from 'react';
import loginArt from '../assets/login-art.jpg'; // save the provided image here
import '../styles/Login.css';

const Loginpage = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields.');
      return;
    }

    const name = formData.email.split('@')[0];
    onLogin({ name, email: formData.email });
    setFormData({ email: '', password: '' });
  };


    return (
    <div className="login-shell">
      {/* ── LEFT: Abstract art panel ── */}
      <div className="login-art">
        <svg viewBox="0 0 560 400" preserveAspectRatio="xMidYMid slice"
             xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect width="560" height="600" fill="#0f0e17"/>

          {/* grid */}
          <g stroke="rgba(124,92,252,0.07)" strokeWidth="0.5">
            {[100,200,300,400,500].map(v=><line key={'h'+v} x1="0" y1={v} x2="560" y2={v}/>)}
            {[100,200,300,400,500].map(v=><line key={'v'+v} x1={v} y1="0" x2={v} y2="600"/>)}
          </g>

          {/* glow */}
          <circle cx="200" cy="320" r="200" fill="rgba(124,92,252,0.06)"/>
          <circle cx="200" cy="320" r="130" fill="rgba(124,92,252,0.07)"/>

          {/* bar chart */}
          <g opacity="0.85">
            <rect x="60"  y="380" width="28" height="80"  rx="5" fill="rgba(124,92,252,0.3)"  stroke="#7c5cfc" strokeWidth="0.8"/>
            <rect x="100" y="340" width="28" height="120" rx="5" fill="rgba(124,92,252,0.45)" stroke="#7c5cfc" strokeWidth="0.8"/>
            <rect x="140" y="300" width="28" height="160" rx="5" fill="#7c5cfc"               stroke="#a78bfa" strokeWidth="0.8"/>
            <rect x="180" y="330" width="28" height="130" rx="5" fill="rgba(124,92,252,0.45)" stroke="#7c5cfc" strokeWidth="0.8"/>
            <rect x="220" y="360" width="28" height="100" rx="5" fill="rgba(124,92,252,0.3)"  stroke="#7c5cfc" strokeWidth="0.8"/>
            <rect x="63"  y="405" width="22" height="55"  rx="4" fill="rgba(34,197,94,0.25)"  stroke="#22c55e" strokeWidth="0.7"/>
            <rect x="103" y="370" width="22" height="90"  rx="4" fill="rgba(34,197,94,0.25)"  stroke="#22c55e" strokeWidth="0.7"/>
            <rect x="143" y="335" width="22" height="125" rx="4" fill="rgba(34,197,94,0.35)"  stroke="#22c55e" strokeWidth="0.7"/>
            <rect x="183" y="355" width="22" height="105" rx="4" fill="rgba(34,197,94,0.25)"  stroke="#22c55e" strokeWidth="0.7"/>
            <rect x="223" y="385" width="22" height="75"  rx="4" fill="rgba(34,197,94,0.22)"  stroke="#22c55e" strokeWidth="0.7"/>
            <line x1="50" y1="460" x2="270" y2="460" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8"/>
          </g>

          {/* trend line */}
          <path d="M60 420 Q160 300 260 270" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.7"/>
          <circle cx="60"  cy="420" r="3.5" fill="#f59e0b" opacity="0.8"/>
          <circle cx="160" cy="310" r="3.5" fill="#f59e0b" opacity="0.8"/>
          <circle cx="260" cy="270" r="4.5" fill="#f59e0b"/>
          <rect x="232" y="242" width="72" height="22" rx="6" fill="#1a1828" stroke="rgba(245,158,11,0.4)" strokeWidth="0.8"/>
          <text x="268" y="257" textAnchor="middle" fontFamily="DM Sans,sans-serif" fontSize="10" fill="#f59e0b" fontWeight="600">+28% ↑</text>

          {/* large coin */}
          <g transform="translate(380,160)">
            <circle cx="0" cy="0" r="46" fill="#1a1828" stroke="#f59e0b" strokeWidth="1.5"/>
            <circle cx="0" cy="0" r="38" fill="none" stroke="rgba(245,158,11,0.25)" strokeWidth="0.8"/>
            <text x="0" y="7" textAnchor="middle" fontFamily="Syne,sans-serif" fontSize="22" fill="#f59e0b" fontWeight="700">₹</text>
          </g>

          {/* small coin */}
          <g transform="translate(460,340)" opacity="0.7">
            <circle cx="0" cy="0" r="24" fill="#1a1828" stroke="#22c55e" strokeWidth="1.2"/>
            <circle cx="0" cy="0" r="19" fill="none" stroke="rgba(34,197,94,0.2)" strokeWidth="0.7"/>
            <text x="0" y="5" textAnchor="middle" fontFamily="Syne,sans-serif" fontSize="12" fill="#22c55e" fontWeight="700">₹</text>
          </g>

          {/* tiny coin */}
          <g transform="translate(340,420)" opacity="0.55">
            <circle cx="0" cy="0" r="14" fill="#1a1828" stroke="#7c5cfc" strokeWidth="1"/>
            <text x="0" y="4" textAnchor="middle" fontFamily="Syne,sans-serif" fontSize="9" fill="#7c5cfc" fontWeight="700">₹</text>
          </g>

          {/* donut */}
          <g transform="translate(420,340)">
            <circle cx="0" cy="0" r="34" fill="#1a1828" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5"/>
            <circle cx="0" cy="0" r="24" fill="none" stroke="#7c5cfc" strokeWidth="10" strokeDasharray="75 76" strokeDashoffset="0"/>
            <circle cx="0" cy="0" r="24" fill="none" stroke="#22c55e" strokeWidth="10" strokeDasharray="45 106" strokeDashoffset="-75"/>
            <circle cx="0" cy="0" r="24" fill="none" stroke="#f59e0b" strokeWidth="10" strokeDasharray="31 120" strokeDashoffset="-120"/>
            <circle cx="0" cy="0" r="14" fill="#1a1828"/>
          </g>

          {/* arrow badges */}
          <g transform="translate(330,240)" opacity="0.6">
            <rect x="-14" y="-14" width="28" height="28" rx="8" fill="rgba(34,197,94,0.12)" stroke="rgba(34,197,94,0.25)" strokeWidth="0.8"/>
            <path d="M0 8 L0 -4 M-5 1 L0 -4 L5 1" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
          <g transform="translate(490,200)" opacity="0.5">
            <rect x="-14" y="-14" width="28" height="28" rx="8" fill="rgba(239,68,68,0.1)" stroke="rgba(239,68,68,0.2)" strokeWidth="0.8"/>
            <path d="M0 -8 L0 4 M-5 -1 L0 4 L5 -1" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </g>

          {/* dots */}
          <g fill="rgba(124,92,252,0.35)">
            <circle cx="350" cy="80"  r="2.5"/><circle cx="390" cy="60"  r="1.5"/>
            <circle cx="430" cy="90"  r="2"/>  <circle cx="480" cy="70"  r="1.5"/>
            <circle cx="510" cy="100" r="2.5"/><circle cx="370" cy="110" r="1"/>
          </g>
          <g fill="rgba(245,158,11,0.25)">
            <circle cx="80"  cy="80"  r="2"/>  <circle cx="50"  cy="120" r="1.5"/>
            <circle cx="30"  cy="200" r="2.5"/><circle cx="500" cy="460" r="2"/>
          </g>

          {/* connector lines */}
          <line x1="380" y1="160" x2="420" y2="316" stroke="rgba(124,92,252,0.15)" strokeWidth="0.7" strokeDasharray="3 3"/>
          <line x1="380" y1="160" x2="460" y2="316" stroke="rgba(245,158,11,0.12)" strokeWidth="0.7" strokeDasharray="3 3"/>

          {/* budget bar mini-card */}
          <g transform="translate(310,480)">
            <rect x="0" y="0" width="200" height="60" rx="10" fill="#1a1828" stroke="rgba(255,255,255,0.07)" strokeWidth="0.8"/>
            <text x="14" y="18" fontFamily="DM Sans,sans-serif" fontSize="9" fill="#9b98b0">Monthly Budget</text>
            <rect x="14" y="26" width="172" height="7" rx="3.5" fill="rgba(255,255,255,0.06)"/>
            <rect x="14" y="26" width="112" height="7" rx="3.5" fill="#7c5cfc"/>
            <text x="14"  y="50" fontFamily="Syne,sans-serif" fontSize="9" fill="#7c5cfc" fontWeight="700">65%</text>
            <text x="186" y="50" textAnchor="end" fontFamily="DM Sans,sans-serif" fontSize="9" fill="#9b98b0">₹13,000 left</text>
          </g>

          {/* tx list mini-card */}
          <g transform="translate(30,480)">
            <rect x="0" y="0" width="170" height="80" rx="10" fill="#1a1828" stroke="rgba(255,255,255,0.07)" strokeWidth="0.8"/>
            <circle cx="18" cy="20" r="8" fill="rgba(34,197,94,0.15)"/>
            <text x="18" y="24" textAnchor="middle" fontFamily="sans-serif" fontSize="9" fill="#22c55e">↑</text>
            <text x="34" y="18" fontFamily="DM Sans,sans-serif" fontSize="9" fill="#f8f7ff">Salary</text>
            <text x="34" y="28" fontFamily="DM Sans,sans-serif" fontSize="8"  fill="#9b98b0">Apr 1</text>
            <text x="158" y="23" textAnchor="end" fontFamily="Syne,sans-serif" fontSize="9" fill="#22c55e" fontWeight="700">+₹45k</text>
            <line x1="12" y1="38" x2="158" y2="38" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5"/>
            <circle cx="18" cy="52" r="8" fill="rgba(239,68,68,0.15)"/>
            <text x="18" y="56" textAnchor="middle" fontFamily="sans-serif" fontSize="9" fill="#ef4444">↓</text>
            <text x="34" y="50" fontFamily="DM Sans,sans-serif" fontSize="9" fill="#f8f7ff">Netflix</text>
            <text x="34" y="60" fontFamily="DM Sans,sans-serif" fontSize="8"  fill="#9b98b0">Apr 7</text>
            <text x="158" y="55" textAnchor="end" fontFamily="Syne,sans-serif" fontSize="9" fill="#ef4444" fontWeight="700">−₹649</text>
          </g>
        </svg>

        {/* overlay text */}
        <div className="login-art__copy">
          <div className="login-art__pill"><span className="login-art__dot" />Smart Finance Tracker</div>
          <h1 className="login-art__title">Every rupee.<br />Tracked smart.</h1>
          <p className="login-art__sub">Budgets, analytics and insights — all in one beautiful dashboard.</p>
          <div className="login-art__stats">
            <div className="login-art__stat">
              <div className="login-art__stat-val">₹45k</div>
              <div className="login-art__stat-lbl">Avg. monthly income</div>
            </div>
            <div className="login-art__stat">
              <div className="login-art__stat-val">28%</div>
              <div className="login-art__stat-lbl">Avg. savings rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT: Form panel ── */}
      <div className="login-form-panel">
        <div className="login-card">
          <div className="login-logo">Spendle</div>
          <p className="login-tagline">Smart personal finance tracker</p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="input-group">
              <label>Email</label>
              <input type="email" name="email" placeholder="you@example.com"
                value={formData.email} onChange={handleChange} autoComplete="email" />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input type="password" name="password" placeholder="••••••••"
                value={formData.password} onChange={handleChange} autoComplete="current-password" />
            </div>

            {error && <p className="login-error">{error}</p>}
            <button type="submit" className="login-btn">Sign In →</button>
          </form>

          <div className="login-divider">
            <span className="login-divider__line" />
            <span className="login-divider__txt">or continue with</span>
            <span className="login-divider__line" />
          </div>

          <div className="login-social">
            <button className="login-social-btn">G&nbsp; Google</button>
            <button className="login-social-btn">⇶&nbsp; GitHub</button>
          </div>

          <p className="login-hint">Demo: any email + password works</p>
          <p className="login-footer">Made with <span className="login-heart">♥</span> by Nancy Gupta</p>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;




