# lard

[![Build Status](https://travis-ci.org/derekchuank/lard.svg?branch=master)](https://travis-ci.org/derekchuank/lard)
[![npm version](https://badge.fury.io/js/lard.svg)](http://badge.fury.io/js/lard)

A HTML template renderer providing massive freedom to programmers.

## Syntax

* `<@@ arbitrary code to run @>` - Don't put the resereved keyword `_lardOutput` in it unless you know what you are doing.

* `<@ something defined in data(see below) evaluated to string @>` - `Almost` equal to <@@ _lardOutput += something @>.

## Usage

```
let lard = require('lard')

let tpl = `
    <div>
        <p><@ content @></p>
        <ul>
            <@@ for(let i = 0 ; i < users.length ; i ++) { user = users[i] @>
                <li>
                    <b><@ user.firstName @></b>
                </li>
            <@@ } @>
        </ul>
    </div>
`;

let data = {
  content: "fake content",
  users: [
    {
      firstName: "foo"
    },
    {
      firstName: "bar"
    }
  ]
};

let result = lard(tpl, data);

/* result: 
*   <div>
*       <p>fake content</p>
*       <ul>
*           <li>
*               <b>foo</b>
*           </li>
*           
*           <li>
*               <b>bar</b>
*           </li>
*       </ul>
*/  </div>
```

## Arguments

Pass the following arguments to the exported function. All are optional.

`tpl` - String. HTML template string.

`data` - Object. Containing proterties will be evaluated to string.

`opt` - Object. Bag of settings.

Settings supported:

- `position` - Boolean. If false, then don't track line/column/position when errors occurred in `<@ ... @>`. Default: `true`.
