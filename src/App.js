import Inertia from 'inertia'
import { Component, createElement } from 'react'
import PageContext from './PageContext'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      page: {
        instance: null,
        props: null,
      },
    }
  }

  componentDidMount() {
    Inertia.init(this.props.component, this.props.props, (component, props) => {
      return Promise.resolve(this.props.resolveComponent(component)).then(instance => {
        this.setState({
          page: { instance, props },
        })
      })
    })
  }

  render() {
    if (!this.state.page.instance) {
      return null
    }

    const Component = this.state.page.instance

    return createElement(
      PageContext.Provider,
      { value: this.state.page },
      createElement(
        Component,
        { key: window.location.pathname, ...this.state.page.props }
      )
    )
  }
}

App.displayName = 'Inertia'

export default App
