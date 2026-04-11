import { createFileRoute } from '@tanstack/react-router'
import AdminLogin from '../pages/auth/AdminLogin'

export const Route = createFileRoute('/admin/login')({
  component: AdminLogin,
})
