/* Shared Sidebar HTML generator */
function getSidebarHTML(activePage) {
  const links = [
    { href:'dashboard.html', icon:'📊', label:'Dashboard', section:'Main' },
    { href:'recommendations.html', icon:'🌱', label:'Plant Recommendations' },
    { href:'plant-library.html', icon:'📚', label:'Plant Library' },
    { href:'water-calculator.html', icon:'💧', label:'Water Calculator', section:'Tools' },
    { href:'calendar.html', icon:'📅', label:'Care Calendar' },
    { href:'disease-identifier.html', icon:'🔬', label:'Disease Identifier' },
    { href:'space-planner.html', icon:'📐', label:'Space Planner' },
    { href:'expenses.html', icon:'💰', label:'Expenses' },
    { href:'weather.html', icon:'🌤️', label:'Weather' },
    { href:'ai-assistant.html', icon:'🤖', label:'AI Assistant', badge:'AI' },
    { href:'community.html', icon:'👥', label:'Community', section:'Community' },
    { href:'learning.html', icon:'📖', label:'Learning' },
    { href:'settings.html', icon:'⚙️', label:'Settings', section:'Account' },
  ];
  const user = (typeof Auth !== 'undefined' && Auth.getUser()) || { name: 'User', email: '' };
  const initials = (user.name || 'U').charAt(0).toUpperCase();

  return `<aside class="sidebar" id="sidebar">
    <div class="sidebar-logo">
      <a href="../index.html" style="display:flex;align-items:center;gap:10px;text-decoration:none">
        <div style="width:36px;height:36px;background:linear-gradient(135deg,var(--primary),var(--secondary));border-radius:10px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:1.1rem">🌿</div>
        <span style="font-family:var(--font-display);font-weight:800;font-size:1.2rem" class="text-gradient">Urban Oasis</span>
      </a>
    </div>
    <nav class="sidebar-nav">
      ${links.map(l => `
        ${l.section ? `<div class="sidebar-section">${l.section}</div>` : ''}
        <a href="${l.href}" class="sidebar-item ${activePage===l.href?'active':''}">
          <span class="icon">${l.icon}</span>${l.label}
          ${l.badge ? `<span class="sidebar-badge">${l.badge}</span>` : ''}
        </a>`).join('')}
    </nav>
    <div class="sidebar-footer">
      <div style="display:flex;align-items:center;gap:10px;padding:0 4px">
        <div style="width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,var(--primary),var(--secondary));display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;flex-shrink:0">${initials}</div>
        <div style="flex:1;min-width:0">
          <div style="font-weight:600;font-size:0.88rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${user.name || 'User'}</div>
          <div style="font-size:0.75rem;color:var(--text-muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${user.email || ''}</div>
        </div>
        <button data-logout style="background:none;font-size:1rem;color:var(--text-muted)" title="Logout">🚪</button>
      </div>
    </div>
  </aside>`;
}

function getTopBar(title, subtitle) {
  const user = (typeof Auth !== 'undefined' && Auth.getUser()) || { name: 'User' };
  const initials = (user.name || 'U').charAt(0).toUpperCase();
  return `<div class="top-bar" style="display:flex;align-items:center;justify-content:space-between;margin-bottom:28px;flex-wrap:wrap;gap:12px">
    <div style="display:flex;align-items:center;gap:12px">
      <button id="sidebar-toggle" style="background:none;font-size:1.4rem;padding:4px" aria-label="Menu">☰</button>
      <div>
        <h1 style="font-size:1.6rem;font-weight:800">${title}</h1>
        ${subtitle ? `<div style="font-size:0.88rem;color:var(--text-muted)">${subtitle}</div>` : ''}
      </div>
    </div>
    <div style="display:flex;align-items:center;gap:10px">
      <button class="theme-toggle-btn btn btn-ghost btn-icon">🌙</button>
      <a href="ai-assistant.html" class="btn btn-primary btn-sm">🤖 Ask AI</a>
      <a href="settings.html" style="width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,var(--primary),var(--secondary));display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;text-decoration:none">${initials}</a>
    </div>
  </div>`;
}
