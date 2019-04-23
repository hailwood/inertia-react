import Inertia from 'inertia'
import { createElement, useEffect, useState } from 'react'
import PageContext from './PageContext'

export default ({ initialPage, resolveComponent }) => {
  const [page, setPage] = useState({ instance: null, props: null })
  useEffect(() => {
    Inertia.init(initialPage, page =>
      Promise.resolve(resolveComponent(page.component)).then(instance => {
        setPage({ instance, props: page.props })
      })
    )
  }, [])

  if (!page.instance) {
    return null
  }

  const Component = page.instance
  return createElement(
    PageContext.Provider,
    { value: page },
    createElement(Component, {
      key: window.location.pathname,
      ...page.props,
    })
  )
}
