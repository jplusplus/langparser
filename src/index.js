import { parse, stringify } from "bcp-47"
/**
 * Looks for eg `lang=XX` or `language=XX` in the query string, and tries to
 * parse out locale and language, according to BCP 47.
 * Use this as a middleware. Parsed values will be in `res.locals.lang` and
 * `res.locals.locale`
 *
 * @function langParser
 * @param {Object} [options] - an options object
 * @param {String} [options.defaultLang] - a fallback value, e.g. `en-GB`
 * @param {String|Array} [options.params] - the url parameter to look in
 */
function langParser(options={}) {
  let opts = options
  let urlParameters = ["lang", "language"]
  if ("params" in opts) {
    if (Array.isArray(opts.params)) {
      urlParameters = opts.params
    } else {
      urlParameters = [opts.params]
    }
  }

  let middleware = function(req, res, next) {
    if (!req.locals){
      req.locals = {}
    }
    let langstring = opts.defaultLang
    urlParameters.forEach(p => {
      langstring = req.params[p] || langstring
    })
    if (!langstring){
      return next()
    }
    let localeSchema = parse(
      langstring,
      {forgiving: true}
    )
    req.locals.lang = localeSchema.language
    req.locals.locale = stringify(localeSchema)
    return next()
  }
  return middleware
}

export default langParser
