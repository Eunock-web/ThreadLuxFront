const API_BASE_URL = 'http://localhost:8000/api';

const getHeaders = () => {
  const token = localStorage.getItem('auth_token');
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
  };
};

export const favorisService = {
  getFavoris: async () => {
    const res = await fetch(`${API_BASE_URL}/favoris`, { headers: getHeaders() });
    return res.json();
  },
  addFavoris: async (variantId: number) => {
    const res = await fetch(`${API_BASE_URL}/favoris/${variantId}`, { method: 'POST', headers: getHeaders() });
    return res.json();
  },
  removeFavoris: async (variantId: number) => {
    const res = await fetch(`${API_BASE_URL}/favoris/${variantId}`, { method: 'DELETE', headers: getHeaders() });
    return res.json();
  },
};
