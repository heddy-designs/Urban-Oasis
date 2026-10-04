/* ===================================
   URBAN OASIS - Core App Utilities
   =================================== */

const API_BASE = 'http://localhost:5000/api';

// ── Theme Manager ──────────────────────────────
const ThemeManager = {
  init() {
    const saved = localStorage.getItem('uo-theme') || 'light';
    this.set(saved);
  },
  set(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('uo-theme', theme);
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
    });
  },
  toggle() {
    const current = localStorage.getItem('uo-theme') || 'light';
    this.set(current === 'dark' ? 'light' : 'dark');
  },
  get() { return localStorage.getItem('uo-theme') || 'light'; }
};

// ── Toast Notifications ────────────────────────
const Toast = {
  container: null,
  init() {
    this.container = document.getElementById('toast-container');
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.id = 'toast-container';
      this.container.className = 'toast-container';
      document.body.appendChild(this.container);
    }
  },
  show(message, type = 'success', duration = 3000) {
    if (!this.container) this.init();
    const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${icons[type]}</span><span>${message}</span>`;
    this.container.appendChild(toast);
    setTimeout(() => toast.remove(), duration);
  }
};

// ── API Client ─────────────────────────────────
const API = {
  async request(endpoint, options = {}) {
    const token = Auth.getToken();
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    try {
      const res = await fetch(`${API_BASE}${endpoint}`, { ...options, headers: { ...headers, ...options.headers } });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Request failed');
      return data;
    } catch (err) {
      if (err.message === 'Failed to fetch') {
        // Offline / server not running - return mock data
        return null;
      }
      throw err;
    }
  },
  get(endpoint) { return this.request(endpoint); },
  post(endpoint, body) { return this.request(endpoint, { method: 'POST', body: JSON.stringify(body) }); },
  put(endpoint, body) { return this.request(endpoint, { method: 'PUT', body: JSON.stringify(body) }); },
  delete(endpoint) { return this.request(endpoint, { method: 'DELETE' }); },
  async upload(endpoint, formData) {
    const token = Auth.getToken();
    const headers = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;
    try {
      const res = await fetch(`${API_BASE}${endpoint}`, { method: 'POST', headers, body: formData });
      return await res.json();
    } catch { return null; }
  }
};

// ── Auth Manager ───────────────────────────────
const Auth = {
  getToken() { return localStorage.getItem('uo-token'); },
  getUser() {
    const u = localStorage.getItem('uo-user');
    try { return u ? JSON.parse(u) : null; } catch { return null; }
  },
  setSession(token, user) {
    localStorage.setItem('uo-token', token);
    localStorage.setItem('uo-user', JSON.stringify(user));
  },
  isLoggedIn() { return !!this.getToken(); },
  logout() {
    localStorage.removeItem('uo-token');
    localStorage.removeItem('uo-user');
    window.location.href = '/frontend/pages/login.html';
  },
  requireAuth() {
    if (!this.isLoggedIn()) {
      window.location.href = '/frontend/pages/login.html';
      return false;
    }
    return true;
  }
};

// ── Navbar ─────────────────────────────────────
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });
  // Mobile hamburger
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('active');
    });
  }
}

// ── Sidebar ────────────────────────────────────
function initSidebar() {
  const toggle = document.getElementById('sidebar-toggle');
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  if (!sidebar) return;
  if (toggle) {
    toggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      if (overlay) overlay.classList.toggle('show');
    });
  }
  if (overlay) {
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('show');
    });
  }
  // Highlight active link
  const links = sidebar.querySelectorAll('.sidebar-item[href]');
  links.forEach(link => {
    if (link.href === window.location.href) link.classList.add('active');
  });
  // User info in sidebar
  const user = Auth.getUser();
  const sidebarUser = document.getElementById('sidebar-user');
  if (sidebarUser && user) {
    sidebarUser.querySelector('.user-name').textContent = user.name || 'User';
    sidebarUser.querySelector('.user-email').textContent = user.email || '';
  }
}

// ── Animations (IntersectionObserver) ─────────
function initAnimations() {
  const els = document.querySelectorAll('.animate-on-scroll');
  if (!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('animate-slide-up');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => { el.style.opacity = '0'; obs.observe(el); });
}

// ── Counter Animation ──────────────────────────
function animateCounter(el, target, duration = 2000) {
  let start = 0;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target).toLocaleString() + (el.dataset.suffix || '');
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounter(e.target, parseInt(e.target.dataset.counter));
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => obs.observe(c));
}

// ── Modal ──────────────────────────────────────
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) { modal.classList.add('open'); document.body.style.overflow = 'hidden'; }
}
function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) { modal.classList.remove('open'); document.body.style.overflow = ''; }
}
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('open');
    document.body.style.overflow = '';
  }
  if (e.target.dataset.closeModal) closeModal(e.target.dataset.closeModal);
  if (e.target.dataset.openModal) openModal(e.target.dataset.openModal);
});

// ── Tabs ───────────────────────────────────────
function initTabs() {
  document.querySelectorAll('.tabs').forEach(tabGroup => {
    tabGroup.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;
        tabGroup.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const panel = document.querySelector(`.tab-content[data-tab="${target}"]`);
        document.querySelectorAll('.tab-content').forEach(p => p.classList.remove('active'));
        if (panel) panel.classList.add('active');
      });
    });
  });
}

// ── Search ─────────────────────────────────────
function initSearch(inputId, clearId, callback) {
  const input = document.getElementById(inputId);
  const clear = document.getElementById(clearId);
  if (!input) return;
  input.addEventListener('input', () => {
    if (clear) clear.classList.toggle('show', input.value.length > 0);
    if (callback) callback(input.value.toLowerCase());
  });
  if (clear) clear.addEventListener('click', () => {
    input.value = '';
    clear.classList.remove('show');
    if (callback) callback('');
  });
}

// ── Loading Spinner ────────────────────────────
function showLoader(containerId) {
  const el = document.getElementById(containerId);
  if (el) el.innerHTML = '<div class="flex-center" style="height:200px"><div class="spin" style="width:40px;height:40px;border:3px solid var(--border);border-top-color:var(--primary);border-radius:50%"></div></div>';
}

// ── Format Utilities ───────────────────────────
const Format = {
  currency: (n) => '₹' + n.toLocaleString('en-IN'),
  date: (d) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
  relativeTime: (d) => {
    const diff = Date.now() - new Date(d);
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  }
};

// ── Local Storage Helper ───────────────────────
const Store = {
  get: (k) => { try { return JSON.parse(localStorage.getItem(`uo-${k}`)); } catch { return null; } },
  set: (k, v) => localStorage.setItem(`uo-${k}`, JSON.stringify(v)),
  remove: (k) => localStorage.removeItem(`uo-${k}`)
};

// ── Init on DOM Ready ──────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();
  Toast.init();
  initNavbar();
  initSidebar();
  initAnimations();
  initCounters();
  initTabs();
  document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => ThemeManager.toggle());
  });
  document.querySelectorAll('[data-logout]').forEach(btn => {
    btn.addEventListener('click', () => Auth.logout());
  });
});
