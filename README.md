# Langparser
[![npm package](https://nodei.co/npm/langparser.png)](https://nodei.co/npm/langparser/)

A restify middleware for parsing language/locale url parameters.

This middleware looks for a language tag in the query string (by deafult in `lang=XX` or `language=XX`), and tries to parse out locale and language, according to BCP 47.
Parsed values will be available for any following routes in `res.locals.lang` and `res.locals.locale`
respectively.

# Installation

```sh
npm install langparser
```

# Usage

```js
const langParser = require("langparser")

server.use(langParser())

server.get("/my/route", (req, res, next) => {
  console.log(res.locals.lang)
  // Visiting /my/route?lang=sv-AX will print `sv`
  // Visiting /my/route?lang=i-klingon will print `tlh`
  console.log(res.locals.locale)
  // Visiting /my/route?lang=sv-AX will print `sv-AX`
  // Visiting /my/route?lang=i-klingon will print `tlh`
}
```

The following options are available:

```js
server.use(langParser({
  defaultLang: "en-GB",  // Fallback language/locale if none found
  params: ["sprache", "lingua"]  // URL param(s) to look for
}))
```

By default we will look for the url parameters `lang` and `language`.

If you want this middleware to work with post requests, you need to call the bodyParser middleware before this one.

For Restify 5.0 and newer:

```js
server.use(restify.plugins.bodyParser())
server.use(langParser())
```

# Changelog

+ 1.0.1

  - Documentation fixes

+ 1.0.0

  - First version
