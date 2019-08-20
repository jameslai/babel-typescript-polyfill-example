# Polyfills example

Babel and Typescript, much to my surprise, do not natively include polyfils. They do transpile _language features_, but that's about it. To enable this feature, a specific setup is required.

Beyond the normal setup stuff including Webpack and Typescript, we'll need to set up Babel. Of course include the normal `@babel/core` and we'll also need to include `@babel/preset-env`, which will allow us to specify a few important features.

## package.json

Biggest thing here is we need to include `core-js` as part of our own list of dependencies. It's not a development dependency, it's something that's actually being shipped in our runtime.

## .babelrc

For one, within `.babelrc` we see `useBuiltIns` set to `usage` and `corejs` set to `3`. Corejs is the easiest one, we're just informing Babel about the core-js version we have on hand. `useBuiltIns` is where the magic really happens. This instructs Babel to include polyfils automatically based on our own usage. So if we start using `Array.from` or `String.endsWith`, the polyfils for those functions will be automatically included. Nice!

## .browserslistrc

Next up in the list of important files is `.browserslistrc`. This file is leveraged by `@babel/preset-env` to dynamically determine which browsers we need to support. In the example I've provided, I've specified any browser whose usage is greater than 1% in the US and specifically nothing that is less than or equal to IE 10.

Using this file is nice since other systems can also anticipate it (like CSS transpilers) and use the same information.

## tsconfig.json

Nothing all too special going on in here, with the exception that we specify under `lib` the value of `es2015`. Without it, Typescript will complain that we cannot use `startsWith` here in our code. With the `lib` value we can inform Typescript we expect our runtime environment to have support for es2015 *(which is actually ES6, yeah kill me).

## webpack.config.js

In here the key is t he module loading for *both* typescript and babel. If we were to just leave the loader at `ts-config`, our transpiling would never happen, so we have to chain our loaders. Interestingly the loders work last to first, so remember that. In this case babel will first feed the file through our `ts-loader` so our Typescript can be transpiled, and then it will be fed through `babel-loader` to get all those delicious automatic polyfils.

## That's a wrap!

That's about it, really. The result here is, honestly, a file that's a little larger than it looks like it needs to be initially (55kb), but once compiled for production the filesize drops to around 8.8kb, and once gzipped is 3.3kb. Not exactly a micro-size considering our original source code is literally 217 bytes, but ideally this is being used in a large project where that size is amortized across a lot more code.
