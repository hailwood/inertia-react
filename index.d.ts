declare namespace InertiaReact {
  type App<
    PagePropsBeforeTransform extends Inertia.PagePropsBeforeTransform = {},
    PageProps extends Inertia.PageProps = {}
  > = React.FC<{
    children?: (props: { Component: React.ReactNode, key: React.Key, props: PageProps }) => React.ReactNode
    initialPage: Inertia.Page<PageProps>
    resolveComponent: (name: string) => Promise<React.ReactNode>
    transformProps?: (props: PagePropsBeforeTransform) => PageProps
  }>

  interface InertiaLinkProps {
    children?: React.ReactNode
    data?: object
    href: string
    method?: string
    onClick?: (
      event: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>
    ) => void
    preserveScroll?: boolean
    preserveState?: boolean
    replace?: boolean
    className?: string
    style?: React.CSSProperties
  }

  type InertiaLink = React.FC<InertiaLinkProps>
}

declare module 'inertia-react' {
  export function usePage<
    PageProps extends Inertia.PageProps = Inertia.PageProps
  >(): {
    component: React.ReactNode | null
    key: number | null
    props: PageProps
  }

  export function usePageProps<
    PageProps extends Inertia.PageProps = Inertia.PageProps
  >(): PageProps

  export function useRememberedState<RememberedState>(
    initialState: RememberedState,
    key: string
  ): [RememberedState, React.Dispatch<React.SetStateAction<RememberedState>>]

  export const Inertia: Inertia.Inertia

  export const InertiaLink: InertiaReact.InertiaLink

  const _default: InertiaReact.App

  export default _default
}
