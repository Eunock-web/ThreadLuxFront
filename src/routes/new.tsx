import { createFileRoute } from '@tanstack/react-router'
import NewArrivals from '../pages/NewArrivals'

export const Route = createFileRoute('/new')({
  component: NewArrivals,
})
