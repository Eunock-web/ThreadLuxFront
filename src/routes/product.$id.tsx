import { createFileRoute } from '@tanstack/react-router'
import ProductDetails from '../pages/ProductDetails'

export const Route = createFileRoute('/product/$id')({
  component: ProductDetails,
})
