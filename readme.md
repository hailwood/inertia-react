# Inertia.js React Adapter

> **Note:** This project is in the very early stages of development and IS NOT yet intended for public consumption. If you submit an issue, I do not guarantee a response. Please do not submit pull requests without first consulting me on Twitter ([@reinink](https://twitter.com/reinink)).

## Installation

Install using NPM:

~~~sh
npm install inertiajs/inertia-react --save
~~~

## Create root template

The first step to using Inertia.js is creating a root template. This template should include your assets, as well as a single `div` with two data attributes: `component` and `props`. This `div` is the root element that we'll use to boot React in. Here's an example:

~~~php
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
    <link href="{{ mix('/css/app.css') }}" rel="stylesheet">
    <script src="{{ mix('/js/app.js') }}" defer></script>
</head>
<body>

<div id="app" data-component="{{ $component }}" data-props="{{ json_encode((object) $props) }}"></div>

</body>
</html>
~~~

## Setting up Webpack

Here is an example Webpack configuration that uses [Laravel Mix](https://github.com/JeffreyWay/laravel-mix). Note the `@` alias to the `/resources/js` directory.

~~~js
const mix = require('laravel-mix')
const path = require('path')

mix.react('resources/js/app.js', 'public/js').webpackConfig({
  output: { chunkFilename: 'js/[name].[contenthash].js' },
  resolve: {
    alias: {
      '@': path.resolve('resources/js'),
    },
  },
})
~~~

## Setup dynamic imports

We recommend using code splitting with Inertia.js. To do this we need to enable [dynamic imports](https://github.com/tc39/proposal-dynamic-import). We'll use a Babel plugin to make this work. First, install the plugin:

~~~sh
npm install @babel/plugin-syntax-dynamic-import --save
~~~

Next, create a `.babelrc` file in your project with the following:

~~~js
{
  "plugins": ["@babel/plugin-syntax-dynamic-import"]
}
~~~

## Initializing React

Next, update your main JavaScript file to boot your Inertia app. All we're doing here is initializing React with the base Inertia page component.

~~~js
import Inertia from 'inertia-react'
import React from 'react'
import { render } from 'react-dom'

let app = document.getElementById('app')

render(
  <Inertia
    component={app.dataset.component}
    props={JSON.parse(app.dataset.props)}
    resolveComponent={(component) => {
      return import(`@/Pages/${component}`).then(module => module.default)
    }}
  />,
  app
)
~~~

The base Inertia page component has three props:

- `component`: The name of the first (current) page component.
- `props`: The props (data) for the first (current) page component.
- `resolveComponent`: A callback that tells Inertia how to load a page component. This callback must return a promise with a page instance.

## Creating a base layout

While not required, for most projects it makes sense to create a default site layout that your specific pages can extend. Save this to `/Shared/Layout.js`.

~~~js
import { InertiaLink } from 'inertia-react'

export default function Layout() {
  return (
    <main>
      <header>
        <InertiaLink href="/">Home</InertiaLink>
        <InertiaLink href="/about">About</InertiaLink>
        <InertiaLink href="/contact">Contact</InertiaLink>
      </header>
      <article>
        <slot />
      </article>
    </main>
  )
}
~~~

## Creating page components

With Inertia.js, each page in your application is a JavaScript component. Here's an example of a page component. Save this to `/Pages/Welcome.js`. Note how it extends the `Layout.js` component we created above.

~~~js
import Layout from '@/Shared/Layout'

export default function Welcome() {
  return (
    <Layout>
      <h1>Welcome</h1>
      <p>Welcome to my first Inertia.js app!</p>
    </Layout>
  )
}
~~~

## Creating links

To create an Inertia link, use the `<InertiaLink>` component:

~~~js
import { InertiaLink } from 'inertia-react'

export default function () {
  return <InertiaLink href="/">Home</InertiaLink>
}
~~~

You can also specify the browser history and scroll behaviour. By default all link clicks "push" a new history state, and reset the scroll position back to the top of the page. However, you can override these defaults using the `replace` and `preserve-scroll` attributes:

~~~js
<InertiaLink replace preserve-scroll href="/">Home</InertiaLink>
~~~

## Manually making Inertia visits

In addition to clicking links, it's also very common to manually make Inertia visits. For example, after a successful login form submission, you may want to "redirect" to a different page. This can be done using the `Inertia.visit()` helper:

~~~js
import { Inertia } from 'inertia-react'

submit() {
  axios.post('/login', this.form).then(response => {
      Inertia.visit(response.data.intendedUrl)
  })
}
~~~

And just like with an `<InertiaLink>`, you can also set the browser history and scroll behaviour:

~~~js
import { Inertia } from 'inertia-react'

Inertia.visit(url, {
  replace: true,
  preserveScroll: true,
})
~~~

In fact, since "replace" is a more common action, you can even do this:

~~~js
import { Inertia } from 'inertia-react'

Inertia.replace(url, { preserveScroll: true })
~~~
