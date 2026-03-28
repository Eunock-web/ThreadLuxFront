import { createFileRoute } from '@tanstack/react-router'
import Payouts from '../pages/dashboard/Payouts'

export const Route = createFileRoute('/dashboard/payouts')({
  component: Payouts,
})
