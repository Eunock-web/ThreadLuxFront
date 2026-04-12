import { API_BASE_URL } from '../api/config';

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
    try {
      const response = await fetch(`${API_BASE_URL}/seller/escrow/release/${transactionId}`, {
        method: 'POST',
        headers: this.getHeaders(),
      });
      
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const data = await response.json();
        return { success: response.ok, message: data.message || "Opération terminée" };
      } else {
        // Handle non-JSON response (like a 500 HTML error page)
        if (!response.ok) {
          throw new Error(`Erreur serveur (${response.status})`);
        }
        return { success: true, message: "Succès" };
      }
    } catch (error: any) {
      console.error("Release funds error:", error);
      return { success: false, message: error.message || "Une erreur réseau est survenue" };
    }
  }

  async getLitiges(): Promise<{ success: boolean; data: any[] }> {
    const response = await fetch(`${API_BASE_URL}/seller/litiges`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    const data = await response.json();
    return { success: response.ok, data: data.data || [] };
  }

  async getTransactionLogs(transactionId: number): Promise<{ success: boolean; data: any[] }> {
    const response = await fetch(`${API_BASE_URL}/transactions/${transactionId}/logs`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    const data = await response.json();
    return { success: response.ok, data: data.data || [] };
  }

  async adminResolveLitige(id: number, decision: 'resolue_vendeur' | 'resolue_acheteur', note: string): Promise<{ success: boolean; message: string }> {
    const response = await fetch(`${API_BASE_URL}/admin/litiges/${id}/resolve`, {
      method: 'PATCH',
      headers: this.getHeaders(),
      body: JSON.stringify({ decision, resolution_note: note }),
    });
    const data = await response.json();
    return { success: response.ok, message: data.message };
  }

  async adminLogin(credentials: any): Promise<{ success: boolean; data: any }> {
    const response = await fetch(`${API_BASE_URL}/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    return { success: response.ok, data };
  }
}

export const escrowService = new EscrowService();
