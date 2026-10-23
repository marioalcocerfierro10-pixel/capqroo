* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: Inter, 'Segoe UI', sans-serif;
  background: linear-gradient(180deg, #f4f7fb 0%, #edf4ff 100%);
  color: #10213c;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  font: inherit;
}

img {
  max-width: 100%;
  display: block;
}

.app-shell {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 20px 80px;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(16, 33, 60, 0.08);
  border-radius: 18px;
  padding: 18px 24px;
  position: sticky;
  top: 0;
  backdrop-filter: blur(14px);
  z-index: 10;
}

.brand-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-mark {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: linear-gradient(135deg, #173a72, #2b78d4);
  color: white;
  display: grid;
  place-items: center;
  font-weight: 800;
  letter-spacing: 0.1em;
  font-size: 0.68rem;
}

.brand-name {
  font-size: 1.1rem;
  font-weight: 800;
  letter-spacing: 0.08em;
}

.main-nav {
  display: flex;
  align-items: center;
  gap: 20px;
  color: #33507f;
  font-weight: 600;
}

.nav-button {
  border: none;
  background: transparent;
  color: #33507f;
  font-weight: 700;
  cursor: pointer;
}

.section {
  padding-top: 84px;
}

.hero {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 30px;
  align-items: center;
  min-height: 520px;
}

.hero-copy h1,
.section-heading h2,
.role-overview h3,
.cta-card h2 {
  margin: 0;
  color: #0d1b2a;
  line-height: 1.1;
}

.hero-copy h1 {
  font-size: clamp(2.5rem, 4vw, 4.5rem);
  margin-top: 10px;
}

.hero-copy p {
  margin-top: 18px;
  max-width: 620px;
  color: #41547e;
  font-size: 1.06rem;
  line-height: 1.7;
}

.eyebrow {
  display: inline-block;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #2b78d4;
}

.hero-actions,
.cta-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 28px;
}

.button {
  border: none;
  border-radius: 12px;
  padding: 14px 22px;
  font-weight: 700;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  cursor: pointer;
}

.button:hover {
  transform: translateY(-1px);
}

.button.primary {
  background: linear-gradient(135deg, #173a72 0%, #2b78d4 100%);
  color: white;
  box-shadow: 0 12px 24px rgba(41, 102, 190, 0.24);
}

.button.secondary {
  background: rgba(43, 120, 212, 0.08);
  color: #173a72;
}

.button.small {
  padding: 10px 14px;
  font-size: 0.9rem;
}

.hero-list {
  list-style: none;
  padding: 0;
  margin-top: 26px;
  display: grid;
  gap: 10px;
  color: #23416d;
  font-weight: 600;
}

.hero-list li::before {
  content: '✓';
  color: #2b78d4;
  margin-right: 10px;
}

.hero-card,
.feature-card,
.course-card,
.metric-card,
.panel-card,
.schedule-card,
.policy-item,
.faq-item,
.cta-card,
.auth-card {
  background: rgba(255, 255, 255, 0.78);
  border-radius: 22px;
  border: 1px solid rgba(16, 33, 60, 0.08);
  box-shadow: 0 16px 38px rgba(15, 45, 81, 0.06);
}

.hero-card {
  padding: 28px;
}

.status-pill,
.status-badge,
.course-tag,
.role-badge {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 7px 12px;
  font-size: 0.75rem;
  font-weight: 700;
}

.status-pill {
  background: rgba(43, 120, 212, 0.1);
  color: #174c8d;
}

.hero-card h3 {
  margin-top: 18px;
  font-size: 1.8rem;
}

.hero-card p {
  line-height: 1.7;
  color: #425779;
}

.mini-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin-top: 22px;
}

.mini-stats div {
  background: #f3f7ff;
  border-radius: 14px;
  padding: 12px 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.mini-stats strong {
  color: #49668e;
  font-size: 0.75rem;
}

.mini-stats span {
  font-weight: 800;
  color: #123361;
}

.section-heading {
  margin-bottom: 26px;
}

.section-heading h2 {
  margin-top: 10px;
  font-size: clamp(2rem, 3vw, 3rem);
}

.feature-grid,
.course-grid,
.metrics-grid,
.panel-grid,
.faq-list {
  display: grid;
  gap: 18px;
}

.feature-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.feature-card,
.course-card,
.metric-card,
.panel-card,
.schedule-card,
.policy-item,
.faq-item {
  padding: 22px 20px;
}

.feature-card h3,
.course-card h3,
.panel-card h4,
.schedule-card h4,
.policy-item h4,
.faq-item h4 {
  margin: 0 0 12px;
  color: #0d1b2a;
}

.feature-card p,
.course-summary,
.panel-card li,
.policy-item p,
.faq-item p,
.role-overview p {
  color: #445d83;
  line-height: 1.7;
}

.split-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 10px;
}

.note {
  color: #486789;
  font-size: 0.93rem;
  font-weight: 600;
}

.course-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.course-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100%;
}

.course-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.status-badge {
  background: rgba(17, 123, 58, 0.12);
  color: #0f6a3f;
}

.course-tag {
  background: rgba(50, 79, 140, 0.08);
  color: #23498e;
}

.course-meta {
  list-style: none;
  padding: 0;
  margin: 18px 0 0;
  display: grid;
  gap: 10px;
  color: #294669;
}

.course-actions {
  display: flex;
  gap: 12px;
  margin-top: 24px;
}

.dashboard-shell {
  max-width: 1200px;
}

.dashboard-topbar {
  margin-bottom: 12px;
}

.topbar-actions {
  display: flex;
  align-items: center;
  gap: 14px;
}

.user-chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border-radius: 999px;
  background: rgba(43, 120, 212, 0.08);
  padding: 8px 12px;
  color: #123361;
  font-weight: 700;
}

.dashboard-section {
  margin-top: 20px;
}

.role-switcher {
  display: inline-flex;
  gap: 10px;
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(16, 33, 60, 0.08);
  border-radius: 14px;
  padding: 8px;
  margin-bottom: 24px;
}

.role-button {
  border: none;
  background: transparent;
  color: #33507f;
  padding: 10px 16px;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
}

.role-button.active {
  background: linear-gradient(135deg, #173a72, #2b78d4);
  color: white;
  box-shadow: 0 10px 24px rgba(43, 120, 212, 0.2);
}

.role-overview {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  align-items: center;
  padding: 20px 24px;
  background: linear-gradient(135deg, rgba(23, 58, 114, 0.06), rgba(43, 120, 212, 0.08));
  border: 1px solid rgba(16, 33, 60, 0.06);
  border-radius: 18px;
  margin-bottom: 24px;
}

.role-badge {
  background: rgba(23, 58, 114, 0.08);
  color: #113a72;
}

.metrics-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.metric-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.metric-card span {
  color: #49668e;
  font-weight: 700;
}

.metric-card strong {
  font-size: clamp(1.5rem, 2vw, 2.2rem);
  color: #0d1b2a;
}

.metric-card small {
  color: #5d708d;
}

.panel-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin-top: 24px;
}

.panel-card ul,
.policy-list,
.faq-list {
  padding-left: 18px;
  margin: 0;
}

.two-column {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 22px;
}

.schedule-card {
  margin-top: 14px;
}

.schedule-row {
  display: grid;
  grid-template-columns: 1fr 1.2fr 1.2fr;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid rgba(16, 33, 60, 0.08);
  color: #264b75;
  font-weight: 600;
}

.schedule-row:last-child {
  border-bottom: none;
}

.policy-list,
.faq-list {
  display: grid;
  gap: 18px;
  list-style: none;
  padding-left: 0;
}

.cta-section {
  padding-bottom: 24px;
}

.cta-card {
  padding: 28px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  background: linear-gradient(135deg, rgba(23, 58, 114, 0.97), rgba(43, 120, 212, 0.9));
}

.cta-card h2 {
  color: white;
  font-size: clamp(1.8rem, 3vw, 2.8rem);
}

.cta-card .eyebrow {
  color: rgba(255, 255, 255, 0.78);
}

.footer {
  margin-top: 36px;
  padding-top: 30px;
  border-top: 1px solid rgba(16, 33, 60, 0.08);
  display: flex;
  justify-content: space-between;
  gap: 18px;
  color: #456289;
}

.footer-links {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.auth-shell {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 24px;
  background: linear-gradient(135deg, #edf4ff, #f7f9ff);
}

.auth-card {
  width: min(100%, 420px);
  padding: 28px;
}

.auth-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 20px;
}

.auth-header h1 {
  margin: 0;
  font-size: 2rem;
  color: #0d1b2a;
}

.auth-toggle {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  margin-bottom: 20px;
}

.auth-tab {
  border: 1px solid rgba(16, 33, 60, 0.08);
  background: rgba(245, 248, 255, 0.8);
  color: #244b7d;
  border-radius: 12px;
  padding: 10px 16px;
  font-weight: 700;
  cursor: pointer;
}

.auth-tab.active {
  background: linear-gradient(135deg, #173a72, #2b78d4);
  color: white;
}

.auth-form {
  display: grid;
  gap: 16px;
}

.auth-form label {
  display: grid;
  gap: 8px;
  color: #23406d;
  font-weight: 700;
}

.auth-form input {
  border: 1px solid rgba(16, 33, 60, 0.08);
  border-radius: 12px;
  padding: 12px 14px;
  font: inherit;
  background: white;
  color: #123361;
}

.auth-submit,
.preview-button {
  width: 100%;
  margin-top: 4px;
}

.message {
  border-radius: 10px;
  padding: 10px 12px;
  font-weight: 600;
}

.message.error {
  background: rgba(216, 56, 56, 0.08);
  color: #9c1f1f;
}

.message.success {
  background: rgba(10, 127, 71, 0.08);
  color: #0f6a3f;
}

@media (max-width: 980px) {
  .topbar,
  .footer,
  .cta-card,
  .split-heading,
  .role-overview,
  .topbar-actions {
    flex-direction: column;
    align-items: flex-start;
  }

  .main-nav {
    display: none;
  }

  .hero,
  .feature-grid,
  .course-grid,
  .metrics-grid,
  .panel-grid,
  .two-column,
  .faq-list {
    grid-template-columns: 1fr;
  }

  .hero {
    min-height: auto;
    padding-top: 30px;
  }

  .cta-card {
    align-items: flex-start;
  }
}

@media (max-width: 640px) {
  .app-shell {
    padding-left: 14px;
    padding-right: 14px;
  }

  .topbar {
    padding: 15px 16px;
  }

  .hero-card,
  .feature-card,
  .course-card,
  .metric-card,
  .panel-card,
  .schedule-card,
  .policy-item,
  .faq-item,
  .auth-card {
    padding: 18px 16px;
  }

  .course-actions,
  .hero-actions,
  .cta-actions {
    flex-direction: column;
  }

  .button {
    width: 100%;
    justify-content: center;
    text-align: center;
  }
}

@media (prefers-reduced-motion: reduce) {
  * {
    scroll-behavior: auto;
    transition: none !important;
  }
}
