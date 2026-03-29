# ThreadLux Frontend - Marketplace Mode & Luxe

ThreadLux est l'interface utilisateur moderne et réactive de la marketplace ThreadLux, conçue pour offrir une expérience d'achat fluide et sécurisée.

## 🛠️ Stack Technique

- **Framework** : [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Langage** : [TypeScript](https://www.typescriptlang.org/)
- **Routage** : [TanStack Router](https://tanstack.com/router)
- **Gestion d'État & Fetching** : [TanStack Query](https://tanstack.com/query)
- **Icons** : [Lucide React](https://lucide.dev/)
- **Paiement** : Intégration directe du widget [FedaPay](https://fedapay.com/)

## 🚀 Installation

1. **Cloner le projet**
2. **Installer les dépendances** :
   ```bash
   npm install
   ```
3. **Configurer les variables d'environnement** :
   Créez un fichier `.env` (si nécessaire) pour pointer vers votre API Laravel :
   ```ini
   VITE_API_URL=http://localhost:8000/api
   ```
4. **Lancer le serveur de développement** :
   ```bash
   npm run dev
   ```

## 📂 Structure du Projet

- `/src/pages` : Contient les pages principales (Accueil, Login, Register, Checkout, Dashboard).
- `/src/components` : Composants UI réutilisables.
- `/src/routes` : Définition des routes de l'application via TanStack Router.
- `/src/pages/Checkout.tsx` : Point d'intégration critique gérant le widget FedaPay et la validation backend.

## 💰 Intégration FedaPay

L'application utilise le script SDK de FedaPay chargé globalement. Le processus de paiement se déroule comme suit :

1. Initialisation du widget avec `window.FedaPay.init()`.
2. Passage de la `public_key` et des infos client.
3. Capture de l'ID de transaction dans le callback `onComplete`.
4. Appel immédiat vers le backend `/payment/verify` pour confirmer et sécuriser la vente.

## 👤 Dashboard Vendeur (Payouts)

Les vendeurs peuvent suivre leurs transactions en attente de déblocage via la page `/dashboard/payouts`.

- **Libérer fond** : Cette action déclenche l'appel API qui initie le virement réel vers le compte du vendeur.
