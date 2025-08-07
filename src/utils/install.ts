import type { App, Plugin, Component } from 'vue'

export type SFCWithInstall<T> = T & Plugin

export const withInstall = <T extends Component>(comp: T) => {
  const component = comp as any
  component.install = (app: App) => {
    const { name } = comp
    if (name) {
      app.component(name, comp)
    }
  }
  return component as T & { install: (app: App) => void }
}