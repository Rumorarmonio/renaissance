export interface NavigationItem {
  label: string
  href: string
}

export const navigation: NavigationItem[] = [
  { label: 'Каталог', href: '#catalog' },
  { label: 'Доставка', href: '#delivery' },
  { label: 'Оплата', href: '#payment' },
  { label: 'Контакты', href: '#contacts' },
  { label: 'О компании', href: '#about' },
]
