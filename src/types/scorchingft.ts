import type { App } from 'vue'

export type ComponentSize = 'large' | 'medium' | 'small' | 'mini'

export interface InstallOptions {
  size: ComponentSize
  zIndex: number
}

export type SFCWithInstall<T> = T & {
  install(app: App): void
}

export type WithInstall<T> = T & {
  install(app: App): void
}

export type ScorchingftComponent = {
  [key: string]: any
  install(app: App): void
}