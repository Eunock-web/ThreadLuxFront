
export interface ProductVariant {
  taille: string;
  couleur: string;
  sku: string;
  stock: number;
}

export interface ProductImage {
  url_image: string;
  is_principal: boolean;
}

export interface ProductData {
  categorie_id: number;
  name: string;
  description: string;
  slug: string;
  prix: number;
  promo?: number;
  origine: string;
  coupe: string;
  stock_global: number;
  variants: ProductVariant[];
  images: ProductImage[];
}

export interface ProductResponse {
  success: boolean;
  message: string;
  data?: any;
  errors?: Record<string, string[]>;
}

const API_BASE_URL = 'http://localhost:8000/api';

class ProductService {
  private getHeaders() {
    const token = localStorage.getItem('auth_token');
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    };
  }

  private async handleResponse(response: Response): Promise<ProductResponse> {
    const data = await response.json();
    if (!response.ok) {
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

  async getProducts(): Promise<{ success: boolean; data: any[] }> {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    const data = await response.json();
    return { success: response.ok, data: data.data || data };
  }

  async getProduct(id: string | number): Promise<{ success: boolean; data: any; images?: any[]; variants?: any[] }> {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    const data = await response.json();
    return data;
  }

  async createProduct(productData: ProductData): Promise<ProductResponse> {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(productData),
    });
    return this.handleResponse(response);
  }

  async getCategories(): Promise<any> {
    // We should implement a categories endpoint in the backend if not exists
    const response = await fetch(`${API_BASE_URL}/categories`, {
      headers: this.getHeaders(),
    });
    return response.json();
  }
}

export const productService = new ProductService();
