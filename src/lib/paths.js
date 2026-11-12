// Resolve a file in /public against Vite's `base` ('/portfolio/').
export const asset = (path) => import.meta.env.BASE_URL + String(path).replace(/^\/+/, '');
