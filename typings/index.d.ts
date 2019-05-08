import Inertia, { Page } from 'inertia'
import { FC, ReactNode } from 'react'

interface AppProps {
  children?: (children: ReactNode) => ReactNode,
  initialPage: Page,
  resolveComponent: (name: string) => ReactNode,
}
declare const App: FC<AppProps>

interface InertiaLinkProps {
  children?: ReactNode,
  href: string,
  method?: string,
  preserveScroll?: boolean,
  replace?: boolean,
}
declare const InertiaLink: FC<InertiaLinkProps>

export default App
export { Inertia, InertiaLink }
