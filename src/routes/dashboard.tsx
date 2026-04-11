import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  beforeLoad: ({ context, location }: any) => {
    // Note: TanStack Router context can be used, but since useAuth is a hook, 
    // we might need to check localStorage or state if available via context.
    // For simplicity, we check the user role from localStorage if it's there.
    const userStr = localStorage.getItem('auth_user');
    const token = localStorage.getItem('auth_token');
    
    if (!token || !userStr) {
      throw redirect({
        to: '/login',
        search: { redirect: location.href },
      })
    }

    const user = JSON.parse(userStr);
    if (!['vendeur', 'admin'].includes(user.role)) {
      throw redirect({ to: '/' })
    }
  },
  component: () => <Outlet />,
})
