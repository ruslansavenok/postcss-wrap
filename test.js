import postcss from 'postcss'
import test    from 'ava'
import plugin  from './'

const SELECTOR = '.wrap'

function process(input, opts) {
  return postcss([ plugin(opts) ]).process(input)
}

function run(t, input, output, opts = { }) {
  return process(input, opts)
    .then( result => {
      t.same(result.css, output)
      t.same(result.warnings().length, 0)
    })
}


test('should return warning if opts.selector was not passed', t => {
  let testCss = 'a{}'
  return process(testCss, {})
    .then(result => {
      t.same(result.css, testCss)
      t.same(result.warnings().length, 1)
    })
})


test('should wrap selector', t => {
  let testCss = 'a{}'
  let expectedCss = `${SELECTOR} ${testCss}`

  return process(testCss, {selector: SELECTOR})
    .then(result => {
      t.same(result.css, expectedCss)
      t.same(result.warnings().length, 0)
    })
})


test('[css-animations] should not wrap "from" selector', t => {
  let testCss = 'from{}'
  return run(t, testCss, testCss, {selector: SELECTOR})
})


test('[css-animations] should not wrap "to" selector', t => {
  let testCss = 'to{}'
  return run(t, testCss, testCss, {selector: SELECTOR})
})


test('[css-animations] should not wrap selectors ending with %', t => {
  let testCss = '50%{}'
  return run(t, testCss, testCss, {selector: SELECTOR})
})


test('should merge opts.skip with defaults for css animations', t => {
  let testCss = 'a{}b{}from{}to{}50%{}'
  let expectedCss = `a{}${SELECTOR} b{}from{}to{}50%{}`
  return process(testCss, {
    selector: SELECTOR,
    skip: /^a/
  }).then(result => {
    t.same(result.css, expectedCss)
    t.same(result.warnings().length, 0)
  })
})


test('should skip selectors from opts.skip', t => {
  let testCss = 'a{}b{}'
  let expectedCss = `${SELECTOR} a{}b{}`
  return process(testCss, {
    selector: SELECTOR,
    skip: /^b/
  }).then(result => {
    t.same(result.css, expectedCss)
    t.same(result.warnings().length, 0)
  })
})


test('should skip selectors from opts.skip array', t => {
  let testCss = 'a{}b{}c{}'
  let expectedCss = `a{}${SELECTOR} b{}c{}`
  return process(testCss, {
    selector: SELECTOR,
    skip: [/^a/, /^c/]
  }).then(result => {
    t.same(result.css, expectedCss)
    t.same(result.warnings().length, 0)
  })
})
