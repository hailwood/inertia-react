import Inertia from 'inertia'
import React from 'react'

type AppProps =  {
  children?: React.ReactNode,
  initialPage: object,
  resolveComponent: (name: string) => React.ReactNode,
}
declare const App: React.FC<AppProps>

type InertiaLinkProps = {
  children?: React.ReactNode,
  href: string,
  method?: string,
  preserveScroll?: boolean,
  replace?: boolean,
}
declare const InertiaLink: React.FC<InertiaLinkProps>

export default App
export { Inertia, InertiaLink }
