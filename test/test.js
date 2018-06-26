const assert = require("assert")
const langParser = require("../src")

describe("langParser", () => {
  let next = function(){}
  let res = {}
  let req = {params: {}}

  it("should return a function", () => {
    assert.equal(typeof langParser(), "function")
  })

  it("should parse a well formed language tag", () => {
    req.params.lang = "sv-AX"
    langParser()(req, res, next)
    assert.equal(res.locals.lang, "sv")
    assert.equal(res.locals.locale, "sv-AX")
  })

  it("should normalized deprecated tags", () => {
    req.params.lang = "i-klingon"
    langParser()(req, res, next)
    assert.equal(res.locals.lang, "tlh")
  })

  it("should look for a specific url parameter", () => {
    req.params.sprache = "sv"
    langParser({params: "sprache"})(req, res, next)
    assert.equal(res.locals.lang, "sv")
  })

  it("should look in multiple url parameters", () => {
    req.params.sprache = "sv"
    req.params.lingua = ""
    langParser({params: ["lingua", "sprache"]})(req, res, next)
    assert.equal(res.locals.lang, "sv")
    langParser({params: ["sprache", "lingua"]})(req, res, next)
    assert.equal(res.locals.lang, "sv")
  })

})
