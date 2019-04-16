import { createElement } from 'react'
import Inertia, { shouldIntercept } from 'inertia'

export default function InertiaLink({
  href,
  method = 'get',
  replace = false,
  preserveScroll = false,
  children,
  ...props
}) {
  function visit(event) {
    if (shouldIntercept(event)) {
      event.preventDefault()
      Inertia.visit(href, {
        method,
        replace,
        preserveScroll,
      })
    }
  }

  return createElement('a', { ...props, href, onClick: visit }, children)
}
