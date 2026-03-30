// API configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  // Helper method for making API requests
  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Transaction API methods
  async getAllTransactions(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/transactions?${queryString}`);
  }

  async getTransactionByHash(hash) {
    return this.request(`/transactions/${hash}`);
  }

  async createTransaction(transactionData) {
    return this.request('/transactions', {
      method: 'POST',
      body: JSON.stringify(transactionData),
    });
  }

  async getTransactionsByAddress(address, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/transactions/address/${address}?${queryString}`);
  }

  async searchTransactions(searchTerm, params = {}) {
    const queryString = new URLSearchParams({ q: searchTerm, ...params }).toString();
    return this.request(`/transactions/search?${queryString}`);
  }

  async getTransactionStats() {
    return this.request('/transactions/stats');
  }

  async updateTransactionGif(hash, gifUrl) {
    return this.request(`/transactions/${hash}/gif`, {
      method: 'PUT',
      body: JSON.stringify({ gifUrl }),
    });
  }

  // User API methods
  async createOrUpdateUser(userData) {
    return this.request('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async getUserByAddress(address) {
    return this.request(`/users/${address}`);
  }

  async getUserWithStats(address) {
    return this.request(`/users/${address}/stats`);
  }

  // Sync API methods
  async syncAllTransactions() {
    return this.request('/sync/all', {
      method: 'POST',
    });
  }

  async syncTransactionByHash(hash) {
    return this.request(`/sync/transaction/${hash}`, {
      method: 'POST',
    });
  }

  async startEventListener() {
    return this.request('/sync/start-listener', {
      method: 'POST',
    });
  }

  async stopEventListener() {
    return this.request('/sync/stop-listener', {
      method: 'POST',
    });
  }
}

export const apiService = new ApiService();
export default apiService;
