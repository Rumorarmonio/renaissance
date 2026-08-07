import product1 from '../assets/products/product-1.jpg'
import product2 from '../assets/products/product-2.jpg'
import product3 from '../assets/products/product-3.jpg'
import product4 from '../assets/products/product-4.jpg'

const productImages = [product1, product2, product3, product4]

export interface Product {
  id: string
  title: string
  artist: string
  image: string
  images?: string[]
  description: string
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
    images: [product1, ...productImages.filter((image) => image !== product1)],
    description: 'Знаменитая композиция Сандро Боттичелли, посвящённая рождению богини Венеры.',
    price: '1 000 000 $',
    oldPrice: '2 000 000 $',
  },
  {
    id: 'last-supper',
    title: '«Тайная вечеря»',
    artist: 'Леонардо да Винчи',
    image: product2,
    images: [product2, ...productImages.filter((image) => image !== product2)],
    description:
      'Монументальная фреска Леонардо да Винчи, изображающая евангельскую сцену Тайной вечери.',
    price: '3 000 000 $',
  },
  {
    id: 'creation-of-adam',
    title: '«Сотворение Адама»',
    artist: 'Микеланджело',
    image: product3,
    images: [product3, ...productImages.filter((image) => image !== product3)],
    description:
      'Фрагмент росписи потолка Сикстинской капеллы с изображением прикосновения Бога к Адаму.',
    price: '5 000 000 $',
    oldPrice: '6 000 000 $',
  },
  {
    id: 'anatomy-lesson',
    title: '«Урок анатомии»',
    artist: 'Рембрандт',
    image: product4,
    images: [product4, ...productImages.filter((image) => image !== product4)],
    description:
      'Групповой портрет работы Рембрандта, созданный по заказу гильдии хирургов Амстердама.',
    price: 'Продана на аукционе',
    sold: true,
  },
]
