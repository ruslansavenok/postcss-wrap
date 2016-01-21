var postcss = require('postcss')
require('colors')

module.exports = postcss.plugin('postcss-wrap', function (opts) {
  opts = opts || {}

  var selectorsBlacklist = [
    /^from/,
    /^to/,
    /\%$/
  ]

  if (opts.skip instanceof Array) {
    selectorsBlacklist = selectorsBlacklist.concat(opts.skip)
  } else if (opts.skip instanceof RegExp) {
    selectorsBlacklist.push(opts.skip)
  }

  return function (css, result) {
    if (!opts.selector) {
      result.warn('opts.selector must be specified'.red)
      return
    }

    css.walkRules(function (rule) {
      rule.selectors = rule.selectors.map(function (selector) {
        for (var i = 0; i < selectorsBlacklist.length; i++) {
          if (selector.match(selectorsBlacklist[i])) {
            return selector
          }
        }
        return opts.selector + ' ' + selector
      })
    })
  }
})
