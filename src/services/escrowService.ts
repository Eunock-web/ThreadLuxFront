const API_BASE_URL = 'http://localhost:8000/api';

export interface Payout {
  id: number;
  reference: string;
  amount: string;
  currency: string;
  status: string;
  escrow_status: string;
  created_at: string;
  acheteur?: {
    firstname: string;
    lastname: string;
    email: string;
  };
  commande?: {
    reference: string;
    items: Array<{
      id: number;
      nom_produit: string;
      qte: number;
      prix_unitaire: string;
    }>;
  };
}

class EscrowService {
  private getHeaders() {
    const token = localStorage.getItem('auth_token');
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    };
  }

  async getPendingPayouts(): Promise<{ success: boolean; data: Payout[] }> {
    const response = await fetch(`${API_BASE_URL}/seller/escrow/pending`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    const data = await response.json();
    return { success: response.ok, data: data.data || [] };
  }

  async releaseFunds(transactionId: number): Promise<{ success: boolean; message: string }> {
    const response = await fetch(`${API_BASE_URL}/seller/escrow/release/${transactionId}`, {
      method: 'POST',
      headers: this.getHeaders(),
    });
    const data = await response.json();
    return { success: response.ok, message: data.message };
  }
}

export const escrowService = new EscrowService();
