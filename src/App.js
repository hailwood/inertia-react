import Inertia from 'inertia'
import { createElement, useEffect, useState } from 'react'
import PageContext from './PageContext'

export default function App({ initialPage, resolveComponent }) {
  const [page, setPage] = useState({
    instance: null,
    props: {}
  })

  useEffect(() => {
    Inertia.init(initialPage, page =>
      Promise.resolve(resolveComponent(page.component)).then(instance => {
        setPage({ instance, props: page.props })
      })
    )
  }, [initialPage, resolveComponent])

  return createElement(
    PageContext.Provider,
    { value: page },
    page.instance
      ? createElement(page.instance, {
        key: window.location.pathname,
        ...page.props,
      })
      : null
  )
}

App.displayName = 'Inertia';
