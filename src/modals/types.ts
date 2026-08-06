export type ModalPosition = 'center' | 'left' | 'right'
export type ModalWidth = 'wide' | 'thin' | 'medium' | 'full'

export type ModalBaseProps = {
  header?: string
  position?: ModalPosition
  width?: ModalWidth
  noPadding?: boolean
  noCloseButton?: boolean
}

export type StatusMessageModalVariant = 'success' | 'error' | 'neutral'

export type StatusMessageModalParams = {
  variant?: StatusMessageModalVariant
  title?: string
  message?: string
  buttonText?: string
  hideMessage?: boolean
  onConfirm?: () => void | Promise<void>
}

export type ProductDetailsModalParams = {
  product: Product
}

export type ModalParamsById = {
  demoLeft: undefined
  demoCenter: undefined
  demoRight: undefined
  statusMessage: StatusMessageModalParams
  productDetails: ProductDetailsModalParams
}

export type ModalParamsFor<T extends string> = T extends keyof ModalParamsById
  ? ModalParamsById[T]
  : undefined

export type ModalParams = ModalParamsById[keyof ModalParamsById]
import type { Product } from '@/data/products'
