const TOKEN_KEY = 'admin_token';

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (t) => localStorage.setItem(TOKEN_KEY, t);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

async function request(path, { method = 'GET', body, isForm = false, auth = false } = {}) {
  const headers = {};
  if (!isForm) headers['Content-Type'] = 'application/json';
  if (auth) headers['Authorization'] = `Bearer ${getToken()}`;
  const res = await fetch(`/api${path}`, {
    method,
    headers,
    body: isForm ? body : body ? JSON.stringify(body) : undefined
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
  return data;
}

export const api = {
  // public
  getProfile: () => request('/profile'),
  getProjects: () => request('/projects'),
  getSettings: () => request('/settings'),
  sendMessage: (body) => request('/contact', { method: 'POST', body }),
  // admin
  login: (password) => request('/auth/login', { method: 'POST', body: { password } }),
  updateProfile: (body) => request('/profile', { method: 'PUT', body, auth: true }),
  updateSettings: (body) => request('/settings', { method: 'PUT', body, auth: true }),
  createProject: (body) => request('/projects', { method: 'POST', body, auth: true }),
  updateProject: (id, body) => request(`/projects/${id}`, { method: 'PUT', body, auth: true }),
  deleteProject: (id) => request(`/projects/${id}`, { method: 'DELETE', auth: true }),
  getMessages: () => request('/contact', { auth: true }),
  deleteMessage: (id) => request(`/contact/${id}`, { method: 'DELETE', auth: true }),
  upload: (file) => {
    const form = new FormData();
    form.append('file', file);
    return request('/upload', { method: 'POST', body: form, isForm: true, auth: true });
  }
};
