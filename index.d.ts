declare namespace InertiaReact {
  type App<
    PagePropsBeforeTransform extends Inertia.PagePropsBeforeTransform = Inertia.PagePropsBeforeTransform,
    PageProps extends Inertia.PageProps = Inertia.PageProps
  > = React.FC<{
    children?: (props: {
      Component: React.ComponentType
      key: React.Key
      props: PageProps
    }) => React.ReactNode
    initialPage: Inertia.Page<PageProps>
    resolveComponent: (
      name: string
    ) => React.ComponentType | Promise<React.ComponentType>
    transformProps?: (props: PagePropsBeforeTransform) => PageProps
  }>

  interface InertiaLinkProps {
    children?: React.ReactNode
    className?: string
    data?: object
    href: string
    method?: string
    onClick?: (
      event:
        | React.MouseEvent<HTMLAnchorElement>
        | React.KeyboardEvent<HTMLAnchorElement>
    ) => void
    preserveScroll?: boolean
    preserveState?: boolean
    replace?: boolean
    style?: React.CSSProperties
  }

  type InertiaLink = React.FC<InertiaLinkProps>
}

declare module '@inertiajs/inertia-react' {
  export function usePage<
    PageProps extends Inertia.PageProps = Inertia.PageProps
  >(): PageProps

  export function useRememberedState<RememberedState>(
    initialState: RememberedState,
    key?: string
  ): [RememberedState, React.Dispatch<React.SetStateAction<RememberedState>>]

  export const Inertia: Inertia.Inertia

  export const InertiaLink: InertiaReact.InertiaLink

  export const InertiaApp: InertiaReact.App
}
