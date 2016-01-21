var postcss = require('postcss')

module.exports = postcss.plugin('postcss-wrap', function (opts) {
    opts = opts || {}

    if (!opts.selector) {
      result.warn('opts.selector must be specified')
    }

    var selectorsBlackList = [
      /^from/,
      /^to/,
      /\%$/
    ]

    if (opts.skip instanceof Array) {
      selectroBlackList = selectroBlackList.concat(opts.skip);
    } else if (opts.skip instanceof RegExp) {
      selectroBlackList.push(opts.skip)
    }

    return function (css, result) {
      css.walkRules(function (rule) {
        rule.selectors = rule.selectors.map(function (selector) {
          for (var i = 0; i < selectroBlackList.length; i++) {
            if (selector.match(selectroBlackList[i])) {
              return selector
            }
          }
          return opts.selector + ' ' + selector
        })
      })
    }
})
