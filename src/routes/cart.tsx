import { createFileRoute, redirect } from '@tanstack/react-router'
import Cart from '../pages/Cart'

export const Route = createFileRoute('/cart')({
  beforeLoad: ({ location }) => {
    const token = localStorage.getItem('auth_token');
    const user = localStorage.getItem('auth_user');

    if (!token || !user) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: Cart,
})
