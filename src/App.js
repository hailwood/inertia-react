import Inertia from 'inertia'
import { createElement, useEffect, useState } from 'react'
import PageContext from './PageContext'

export default function App({
  children,
  initialPage,
  resolveComponent,
  transformProps = props => props,
}) {
  const [page, setPage] = useState({
    instance: null,
    props: {},
  })

  useEffect(() => {
    Inertia.init(initialPage, page =>
      Promise.resolve(resolveComponent(page.component)).then(instance => {
        setPage({
          instance,
          props: transformProps(page.props),
        })
      })
    )
  }, [initialPage, resolveComponent, transformProps])

  if (!page.instance) {
    return createElement(PageContext.Provider, { value: page }, null)
  }

  const renderChildren = children
    || (({ Component, props, key }) => createElement(Component, { key, ...props }))

  return createElement(
    PageContext.Provider,
    { value: page },
    renderChildren({ Component: page.instance, key: window.location.pathname, props: page.props })
  )
}

App.displayName = 'Inertia'
