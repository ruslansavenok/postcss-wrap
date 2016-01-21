# postcss-wrap

> Wrap CSS rules in a namespace

## Install

```shell
npm install postcss-wrap --save-dev
```

## Usage

`postcsswrap({selector: '.wrap', skip: '.wrap'})`


## Options

#### options.selector
Type: `String`

Provide a namespace selector in which to wrap CSS.

#### options.skip
Type: `Regular Expression` or `Array of Regular Expressions`

Skip selectors from being wrapped. Even if you will not set this option, it will still skip css animation selectors `from`, `to` and `endingWithPercentSymbol%`
