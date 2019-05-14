import Inertia, { Page } from 'inertia'
import { FC, Key, ReactNode } from 'react'

interface AppProps {
  children?: ({ Component: ReactNode, key: Key, props: PageProps }) => ReactNode,
  initialPage: Page,
  resolveComponent: (name: string) => ReactNode,
}
declare const App: FC<AppProps>

interface InertiaLinkProps {
  children?: ReactNode,
  href: string,
  method?: string,
  onClick?: () => void,
  preserveScroll?: boolean,
  replace?: boolean,
}
declare const InertiaLink: FC<InertiaLinkProps>

interface PageProps {}

export default App
export { Inertia, InertiaLink }
