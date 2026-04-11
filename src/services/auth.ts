export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: User;
  errors?: Record<string, string[]>;
}

import { API_BASE_URL } from '../api/config';

class AuthService {
  private getHeaders() {
    const token = localStorage.getItem('auth_token');
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    };
  }

  private async handleResponse(response: Response): Promise<AuthResponse> {
    const data = await response.json();
    
    if (!response.ok) {
      // If it's a validation error (422), try to get the first specific error
      if (response.status === 422 && data.errors) {
        const firstErrorKey = Object.keys(data.errors)[0];
        const firstErrorMessage = data.errors[firstErrorKey][0];
        return {
          success: false,
          message: firstErrorMessage || data.message || 'Validation failed',
          errors: data.errors
        };
      }
      return {
        success: false,
        message: data.message || 'Une erreur est survenue',
        errors: data.errors
      };
    }
    
    return {
      success: true,
      ...data
    };
  }

  async login(credentials: any): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(credentials),
    });
    const result = await this.handleResponse(response);
    if (result.success && result.token) {
      localStorage.setItem('auth_token', result.token);
    }
    return result;
  }

  async adminLogin(credentials: any): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/admin/login`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(credentials),
    });
    const result = await this.handleResponse(response);
    if (result.success && result.token) {
      localStorage.setItem('auth_token', result.token);
    }
    return result;
  }

  async register(userData: any): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(userData),
    });
    const result = await this.handleResponse(response);
    if (result.success && result.token) {
      localStorage.setItem('auth_token', result.token);
    }
    return result;
  }

  async logout(): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/logout`, {
      method: 'POST',
      headers: this.getHeaders(),
    });
    const result = await this.handleResponse(response);
    if (result.success) {
      localStorage.removeItem('auth_token');
    }
    return result;
  }

  async getCurrentUser(): Promise<User | null> {
    const token = localStorage.getItem('auth_token');
    if (!token) return null;

    try {
      const response = await fetch(`${API_BASE_URL}/user`, {
        method: 'GET',
        headers: this.getHeaders(),
      });
      if (response.ok) {
        return await response.json();
      }
      return null;
    } catch (error) {
      return null;
    }
  }
}

export const authService = new AuthService();
