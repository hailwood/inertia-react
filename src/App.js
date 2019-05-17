import Inertia from 'inertia'
import { createElement, useEffect, useState } from 'react'
import PageContext from './PageContext'

export default function App({ initialPage, resolveComponent, children }) {
  const [page, setPage] = useState({
    component: null,
    props: {},
  })

  useEffect(() => {
    Inertia.init({
      initialPage,
      resolveComponent,
      updatePage: (component, props) => {
        setPage({ component, props })
      },
    })
  }, [initialPage, resolveComponent])

  if (!page.component) {
    return createElement(PageContext.Provider, { value: page }, null)
  }

  const renderChildren = children
    || (({ Component, props, key }) => createElement(Component, { key, ...props }))

  return createElement(
    PageContext.Provider,
    { value: page },
    renderChildren({ Component: page.component, key: window.location.pathname, props: page.props })
  )
}

App.displayName = 'Inertia'
