import Inertia, { Page } from 'inertia'
import { FC, Key, ReactNode } from 'react'

interface AppProps<PageProps = {}> {
  children?: ({ Component: ReactNode, key: Key, props: PageProps }) => ReactNode,
  initialPage: Page,
  resolveComponent: (name: string) => ReactNode,
}
declare interface App<PageProps = {}> extends FC<AppProps<PageProps>> {}

interface InertiaLinkProps {
  children?: ReactNode,
  href: string,
  method?: string,
  onClick?: () => void,
  preserveScroll?: boolean,
  replace?: boolean,
}
declare const InertiaLink: FC<InertiaLinkProps>

export default App
export { Inertia, InertiaLink }
