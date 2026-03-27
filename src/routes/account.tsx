import { createFileRoute, redirect } from '@tanstack/react-router'
import BuyerDashboard from '../pages/BuyerDashboard'

export const Route = createFileRoute('/account')({
  component: BuyerDashboard,
  beforeLoad: ({ context }) => {
    // If we have an auth context, we could check it here. For now, it handles redirect inside the component.
  }
})
