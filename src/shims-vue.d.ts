declare module '*.vue' {
  import Vue from 'vue'

  export default Vue
}

declare module '*.jpg' {
  const source: string

  export default source
}
