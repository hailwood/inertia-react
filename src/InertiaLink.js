import Inertia, { shouldIntercept } from 'inertia'
import { createElement, useCallback } from 'react'

export default function InertiaLink({
  href,
  method = 'get',
  preserveScroll = false,
  replace = false,
  children,
  ...props
}) {
  const visit = useCallback(event => {
    if (shouldIntercept(event)) {
      event.preventDefault()

      Inertia.visit(href, {
        method,
        preserveScroll,
        replace,
      })
    }
  }, [href, method, preserveScroll, replace])

  return createElement('a', { ...props, href, onClick: visit }, children)
}
