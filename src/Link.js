import Inertia, { shouldIntercept } from 'inertia'
import { createElement, useCallback } from 'react'

const noop = () => undefined
export default function InertiaLink({
  href,
  method = 'get',
  preserveScroll = false,
  replace = false,
  data = {},
  children,
  onClick = noop,
  ...props
}) {
  return createElement('a', {
    ...props,
    href,
    onClick: useCallback(event => {
      onClick(event)

      if (shouldIntercept(event)) {
        event.preventDefault()

        Inertia.visit(href, {
          method,
          preserveScroll,
          replace,
          data,
        })
      }
    }, [onClick, href, method, preserveScroll, replace, data]),
  }, children)
}
