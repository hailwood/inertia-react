import Inertia, { Page as InertiaPage } from 'inertia'
import { Dispatch, FC, Key, ReactNode, SetStateAction } from 'react'

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

declare function usePageProps<PageProps = {}>(): PageProps

declare function useRememberedState<RememberedState>(
  initialState: RememberedState,
  key: string
): [RememberedState, Dispatch<SetStateAction<RememberedState>>]

export default App
export { Inertia, InertiaLink, Page, usePage, usePageProps, useRememberedState }
