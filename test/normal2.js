let assert = require("assert");

console.log(`${__filename} ...`);

let lard = require("..");
let tpl = `
    <div>
        <p><@ content @></p>
        <ul>
            <@@ for(let i = 0 ; i < users.length ; i ++) { user = users[i] @>
                <li>
                    <b><@@ _lardOutput += user.firstName @></b>
                    <b><@ user.dumbName @></b>
                    <b><@ user.dumbName.dumbSub @></b>
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

let expected = `
    <div>
        <p>fake content</p>
        <ul>
            
                <li>
                    <b>foo</b>
                    <b>Line: 7, Column: 25, Position: 241. Exp: user.dumbName TypeError:  user.dumbName is undefined</b>
                    <b>Line: 8, Column: 25, Position: 288. Exp: user.dumbName.dumbSub TypeError: Cannot read property 'dumbSub' of undefined</b>
                </li>
            
                <li>
                    <b>bar</b>
                    <b>Line: 7, Column: 25, Position: 241. Exp: user.dumbName TypeError:  user.dumbName is undefined</b>
                    <b>Line: 8, Column: 25, Position: 288. Exp: user.dumbName.dumbSub TypeError: Cannot read property 'dumbSub' of undefined</b>
                </li>
            
        </ul>
    </div>
`;

let rendered = lard(tpl, data);
console.log(rendered);
assert.strictEqual(rendered, expected);
