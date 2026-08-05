import product1 from '../assets/products/product-1.jpg'
import product2 from '../assets/products/product-2.jpg'
import product3 from '../assets/products/product-3.jpg'
import product4 from '../assets/products/product-4.jpg'

export interface Product {
  id: string
  title: string
  artist: string
  image: string
  price: string
  oldPrice?: string
  sold?: boolean
}

export const products: Product[] = [
  {
    id: 'venus',
    title: '«Рождение Венеры»',
    artist: 'Сандро Боттичелли',
    image: product1,
    price: '1 000 000 $',
    oldPrice: '2 000 000 $',
  },
  {
    id: 'last-supper',
    title: '«Тайная вечеря»',
    artist: 'Леонардо да Винчи',
    image: product2,
    price: '3 000 000 $',
  },
  {
    id: 'creation-of-adam',
    title: '«Сотворение Адама»',
    artist: 'Микеланджело',
    image: product3,
    price: '5 000 000 $',
    oldPrice: '6 000 000 $',
  },
  {
    id: 'anatomy-lesson',
    title: '«Урок анатомии»',
    artist: 'Рембрандт',
    image: product4,
    price: 'Продана на аукционе',
    sold: true,
  },
]
