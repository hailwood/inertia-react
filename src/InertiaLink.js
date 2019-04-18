import Inertia, { shouldIntercept } from 'inertia'
import { createElement } from 'react'

export default ({
  href,
  method = 'get',
  replace = false,
  preserveScroll = false,
  children,
  ...props
}) => {
  const visit = event => {
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
