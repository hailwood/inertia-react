import Inertia from 'inertia'
import { createElement, useEffect, useState } from 'react'
import PageContext from './PageContext'

export default function App({ initialPage, resolveComponent, children }) {
  const [page, setPage] = useState({
    instance: null,
    props: {},
  })

  useEffect(() => {
    Inertia.init(initialPage, page =>
      Promise.resolve(resolveComponent(page.component)).then(instance => {
        setPage({ instance, props: page.props })
      })
    )
  }, [initialPage, resolveComponent])

  if (!page.instance) {
    return createElement(PageContext.Provider, { value: page }, null)
  }

  const renderChildren = children
    ? children
    : ({ Component, props, key }) => createElement(Component, { key, ...props })

  return createElement(
    PageContext.Provider,
    { value: page },
    renderChildren({ Component: page.instance, key: window.location.pathname, props: page.props })
  )
}

App.displayName = 'Inertia'
