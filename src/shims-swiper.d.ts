declare module 'swiper' {
  export interface SwiperOptions {
    [key: string]: any
  }

  class Swiper {
    [key: string]: any

    constructor(element: HTMLElement, options?: SwiperOptions)
  }

  export default Swiper
}
