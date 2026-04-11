import { createFileRoute } from '@tanstack/react-router'
import Litiges from '../pages/dashboard/Litiges'

export const Route = createFileRoute('/dashboard/litiges')({
  component: Litiges,
})
