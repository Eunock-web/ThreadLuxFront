# ThreadLux — Frontend Marketplace Mode & Luxe

ThreadLux est l'interface utilisateur moderne de la marketplace ThreadLux. Conçue avec React + TypeScript, elle offre une expérience d'achat fluide, sécurisée et réactive.

---

## 🛠️ Stack Technique

| Outil                                                     | Rôle                                        |
| --------------------------------------------------------- | ------------------------------------------- |
| [React](https://react.dev/) + [Vite](https://vitejs.dev/) | Framework UI + build system                 |
| [TypeScript](https://www.typescriptlang.org/)             | Typage statique                             |
| [TanStack Router](https://tanstack.com/router)            | Routage type-safe avec guards de navigation |
| [TanStack Query](https://tanstack.com/query)              | Fetching & caching des données API          |
| [Lucide React](https://lucide.dev/)                       | Icônes                                      |
| [FedaPay Widget](https://fedapay.com/)                    | Paiement mobile money intégré               |

---

## 🚀 Installation

```bash
# 1. Installer les dépendances
npm install

# 2. Configurer l'environnement
# Créer un fichier .env à la racine du projet
VITE_API_URL=http://localhost:8000/api
VITE_FEDAPAY_PUBLIC_KEY=pk_sandbox_...

# 3. Démarrer le serveur de développement
npm run dev
```

---

## 📂 Architecture du Projet

```
src/
├── contexts/
│   ├── AuthContext.tsx      # Gestion globale de l'authentification (user, login, logout)
│   └── CartContext.tsx      # Panier isolé par utilisateur via localStorage
├── pages/
│   ├── Home.tsx             # Page d'accueil — produits en vedette
│   ├── Shop.tsx             # Catalogue avec filtres par catégorie
│   ├── ProductDetails.tsx   # Fiche produit détaillée
│   ├── Cart.tsx             # Panier d'achat (réservé aux utilisateurs connectés)
│   ├── Checkout.tsx         # Paiement via widget FedaPay + vérification backend
│   ├── BuyerDashboard.tsx   # Tableau de bord acheteur
│   └── NewArrivals.tsx      # Nouveaux produits
├── routes/
│   ├── __root.tsx           # Layout racine (Navbar, Footer, Providers)
│   ├── cart.tsx             # Route /cart — protégée par guard d'auth
│   ├── checkout.tsx         # Route /checkout
│   ├── dashboard.tsx        # Layout dashboard vendeur
│   ├── dashboard.payouts.tsx# Gestion des payouts escrow (vendeurs)
│   ├── dashboard.litiges.tsx# Gestion des litiges (vendeurs/admin)
│   └── ...
├── services/
│   └── auth.ts             # Service d'appels API d'authentification
└── components/             # Composants UI réutilisables (Navbar, ProductCard, etc.)
```

---

## 🔐 Sécurité & Authentification

### Protection des routes

La route `/cart` est protégée par un `beforeLoad` TanStack Router :

```typescript
// src/routes/cart.tsx
export const Route = createFileRoute("/cart")({
  beforeLoad: ({ location }) => {
    const token = localStorage.getItem("auth_token");
    const user = localStorage.getItem("auth_user");
    if (!token || !user) {
      throw redirect({ to: "/login", search: { redirect: location.href } });
    }
  },
  component: Cart,
});
```

Les routes du dashboard vendeur (`/dashboard/*`) sont également protégées et réservées aux rôles `vendeur` / `admin`.

### Isolation du panier par utilisateur

Le panier est stocké dans le `localStorage` avec une clé dynamique basée sur l'ID utilisateur :

```typescript
// src/contexts/CartContext.tsx
const cartKey = user ? `threadlux_cart_${user.id}` : "threadlux_cart_guest";
```

- **Utilisateur A** → clé `threadlux_cart_42`
- **Utilisateur B** → clé `threadlux_cart_17`

Lorsque l'utilisateur se connecte ou se déconnecte, le contexte recharge automatiquement le bon panier. Les paniers sont ainsi parfaitement isolés — **aucune fuite de données entre comptes**.

---

## 💰 Intégration FedaPay

Le paiement se déroule entièrement dans `src/pages/Checkout.tsx` :

1. Le script SDK FedaPay est chargé globalement dans `index.html`.
2. `window.FedaPay.init()` est appelé avec la `public_key` et les informations du client.
3. Le callback `onComplete` reçoit l'ID de transaction FedaPay.
4. Une requête `POST /payment/verify` est envoyée au backend avec l'ID transaction et les articles du panier.
5. Le backend vérifie le paiement **directement avec la clé secrète FedaPay** (jamais la clé publique) avant de créer la commande et de bloquer les fonds en escrow.

> ⚠️ **Sécurité** : Le statut de paiement n'est jamais lu depuis le client. Seul le backend, avec accès à la clé secrète, confirme la transaction.

---

## 👤 Comptes & Rôles

| Rôle      | Accès                                                                    |
| --------- | ------------------------------------------------------------------------ |
| `client`  | Navigation, panier, checkout, dashboard acheteur                         |
| `vendeur` | Dashboard vendeur (payouts, litiges, produits) — **ne peut pas acheter** |
| `admin`   | Toutes les routes admin (litiges, résolution)                            |

Les vendeurs et admins sont **bloqués au niveau de la route `/checkout`** et rejetés par le backend sur `POST /payment/verify` — double protection.

---

## 🏪 Dashboard Vendeur

Accessible via `/dashboard` après connexion via `/admin/login`.

| Page            | URL                       | Description                          |
| --------------- | ------------------------- | ------------------------------------ |
| Payouts         | `/dashboard/payouts`      | Transactions en attente de déblocage |
| Litiges         | `/dashboard/litiges`      | Disputes ouvertes par les acheteurs  |
| Produits        | `/dashboard/products`     | Catalogue du vendeur                 |
| Ajouter produit | `/dashboard/products/add` | Formulaire de création produit       |

---

## 🔨 Scripts disponibles

```bash
npm run dev      # Démarrer le serveur de développement (Vite)
npm run build    # Build production
npm run preview  # Prévisualiser le build
npm run lint     # Linter ESLint
```
