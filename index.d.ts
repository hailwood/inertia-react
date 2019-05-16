import Inertia, {
  Page as InertiaPage,
  PageProps as InertiaPageProps,
} from 'inertia'
import {
  Dispatch,
  FC,
  Key,
  MouseEvent,
  KeyboardEvent,
  ReactNode,
  SetStateAction,
} from 'react'

interface AppProps<
  PageProps extends InertiaPageProps = {},
  TransformedProps = PageProps
> {
  children?: ({ Component: ReactNode, key: Key, props: PageProps }) => ReactNode
  initialPage: InertiaPage<PageProps>
  resolveComponent: (name: string) => Promise<ReactNode>
  transformProps?: (props: PageProps) => TransformedProps
}
type App<
  PageProps extends InertiaPageProps = {},
  TransformedProps = PageProps
> = FC<AppProps<PageProps, TransformedProps>>

interface InertiaLinkProps {
  children?: ReactNode
  data?: object
  href: string
  method?: string
  onClick?: (
    event: MouseEvent<HTMLAnchorElement> | KeyboardEvent<HTMLAnchorElement>
  ) => void
  preserveScroll?: boolean
  replace?: boolean
}
type InertiaLink = FC<InertiaLinkProps>

interface Page<TransformedProps = {}> {
  component: ReactNode | null
  key: number | null
  props: TransformedProps | {}
}

declare function usePage<TransformedProps = {}>(): Page<TransformedProps>

declare function usePageProps<TransformedProps = {}>(): TransformedProps

declare function useRememberedState<RememberedState>(
  initialState: RememberedState,
  key: string
): [RememberedState, Dispatch<SetStateAction<RememberedState>>]

export default App
export { Inertia, InertiaLink, Page, usePage, usePageProps, useRememberedState }
