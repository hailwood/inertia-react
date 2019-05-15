import Inertia, { shouldIntercept } from 'inertia'
import { createElement, useCallback } from 'react'

export default function InertiaLink({
  href,
  method = 'get',
  preserveScroll = false,
  replace = false,
  data = null,
  children,
  onClick,
  ...props
}) {
  const visit = useCallback(event => {
    if (onClick) {
      onClick(event)
    }

    if (shouldIntercept(event)) {
      event.preventDefault()

      Inertia.visit(href, {
        method,
        preserveScroll,
        replace,
        data,
      })
    }
  }, [onClick, href, method, preserveScroll, replace, data])

  return createElement('a', { ...props, href, onClick: visit }, children)
}
