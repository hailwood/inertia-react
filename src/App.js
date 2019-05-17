import Inertia from 'inertia'
import { createElement, useEffect, useState } from 'react'
import PageContext from './PageContext'

const identity = i => i

export default function App({
  children,
  initialPage,
  resolveComponent,
  transformProps = identity,
}) {
  const [page, setPage] = useState({
    component: null,
    key: null,
    props: {},
  })

  useEffect(() => {
    Inertia.init({
      initialPage,
      resolveComponent,
      updatePage: (component, props, { preserveState }) => {
        setPage(page => ({
          component,
          key: preserveState ? page.key : Date.now(),
          props: transformProps(props),
        }))
      },
    })
  }, [initialPage, resolveComponent, transformProps])

  if (!page.component) {
    return createElement(PageContext.Provider, { value: page }, null)
  }

  const renderChildren = children
    || (({ Component, props, key }) => createElement(Component, { key, ...props }))

  return createElement(
    PageContext.Provider,
    { value: page },
    renderChildren({ Component: page.component, key: page.key, props: page.props })
  )
}

App.displayName = 'Inertia'
