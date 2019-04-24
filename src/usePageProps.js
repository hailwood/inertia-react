import { useContext } from 'react'
import PageContext from './PageContext'

export default function usePageProps() {
  const { props } = useContext(PageContext)

  return props
}
