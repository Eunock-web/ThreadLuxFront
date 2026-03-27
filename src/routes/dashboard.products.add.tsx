import { createFileRoute } from '@tanstack/react-router'
import AddProduct from '../pages/dashboard/AddProduct'

export const Route = createFileRoute('/dashboard/products/add')({
  component: AddProduct,
})
