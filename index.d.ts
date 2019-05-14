import Inertia, { Page as InertiaPage } from 'inertia'
import { FC, Key, ReactNode } from 'react'

interface AppProps<PageProps = {}> {
  children?: ({ Component: ReactNode, key: Key, props: PageProps }) => ReactNode,
  initialPage: InertiaPage,
  resolveComponent: (name: string) => ReactNode,
}
interface App<PageProps = {}> extends FC<AppProps<PageProps>> {}

interface InertiaLinkProps {
  children?: ReactNode,
  href: string,
  method?: string,
  onClick?: () => void,
  preserveScroll?: boolean,
  replace?: boolean,
}
declare const InertiaLink: FC<InertiaLinkProps>

interface Page<PageProps = {}> {
  instance: ReactNode | null,
  props: PageProps | {},
}

declare function usePage<PageProps = {}>(): Page<PageProps>

export default App
export { Inertia, InertiaLink, Page, usePage }
