# Langparser
[![npm package](https://nodei.co/npm/langparser.png)](https://nodei.co/npm/langparser/)

A middleware for parsing language/locale url parameters in Express, Fastify or Restify (or derivatives).

This middleware looks for a language tag in the query string (by default in `lang=XX` or `language=XX`), and tries to parse out locale and language, according to BCP 47.
Parsed values will be available for any following routes in `res.locals.lang` and `res.locals.locale`
respectively.

# Installation

``` sh
npm install langparser
```

# Usage

```js
const langParser = require("langparser")

server.use(langParser())

server.get("/my/route", (req, res, next) => {
  console.log(req.locals.lang)
  // Visiting /my/route?lang=sv-AX will print 'sv'
  // Visiting /my/route?lang=i-klingon will print 'tlh'
  console.log(req.locals.locale)
  // Visiting /my/route?lang=sv-AX will print 'sv-AX'
  // Visiting /my/route?lang=i-klingon will print 'tlh'
})
```

The following options are available:

```js
server.use(langParser({
  defaultLang: "en-GB",  // Fallback language/locale if none found
  params: ["sprache", "lingua"]  // URL param(s) to look for
}))
```

By default we will look for the url parameters `lang` and `language`.

## Restify

If you want this middleware to work with post requests in Restify, you need to call the bodyParser middleware before this one.

For Restify 5.0 and newer:

```js
server.use(restify.plugins.bodyParser())
server.use(langParser())
```

## Fastify

If you use Fastify, you need the `@fastify/Express` plugin:

```js
import express from "@fastify/express"
await fastify.register(express)
fastify.use(langParser())
```
In the Fastify routes, parsed paramerters will be available under `req.raw.locals`

# Changelog

+ 3.1.0
  - Look in both `req.query` and `req.params`, as `query` is used by e.g. Fastify.

+ 3.0.0

  - Parse locale data moved from `res` to `req`
  - Document Express and Fastify usage

+ 2.0.1

  - Specify engine requirement to NodeJS >= 12.20.0, as we are now ESM only
  - rename .eslintrc.js > .eslintrc.cjs

+ 2.0.0

  - Convert to ESM

+ 1.1.1

  - Dependency upgrades

+ 1.1.0

  - Add Restify 8 to peerDependencies, and require NodeJS >= 8

+ 1.0.1

  - Documentation fixes

+ 1.0.0

  - First version
