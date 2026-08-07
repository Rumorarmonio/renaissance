declare module '*.vue' {
  import Vue from 'vue'

  export default Vue
}

declare module '*.jpg' {
  const source: string

  export default source
}

declare module '*.svg' {
  const source: string

  export default source
}
