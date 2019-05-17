import Inertia, { shouldIntercept } from 'inertia'
import { createElement, useCallback } from 'react'

const noop = () => undefined

export default function InertiaLink({
  children,
  data = {},
  href,
  method = 'get',
  onClick = noop,
  preserveScroll = false,
  replace = false,
  ...props
}) {
  const visit = useCallback(event => {
    onClick(event)

    if (shouldIntercept(event)) {
      event.preventDefault()

      Inertia.visit(href, {
        data,
        method,
        preserveScroll,
        replace,
      })
    }
  }, [data, href, method, onClick, preserveScroll, replace])

  return createElement('a', { ...props, href, onClick: visit }, children)
}
