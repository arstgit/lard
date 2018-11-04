module.exports = function(tpl, data, opt = {}) {
  let trackPosition = opt.position !== false;

  let declarations = "";
  // May have properties owned by data's protos.
  for (let k in data) {
    declarations += `let ${k} = ${JSON.stringify(data[k])};`;
  }

  let body = "";
  let i = 0;
  let position = 0;
  let line = 0;
  let column = 0;

  function getPos() {
    if (!trackPosition) return "";
    return `Line: ${line}, Column: ${column}, Position: ${position}. `;
  }

  while (true) {
    i = tpl.indexOf("<@");

    let newLine = -1;
    let firstColumnPos = 0;
    while (
      (newLine = tpl.indexOf("\n", newLine + 1)) !== -1 &&
      newLine + 1 < i
    ) {
      line++;
      column = 0;
      firstColumnPos = newLine + 1;
    }

    if (i === -1) {
      // plain text
      body += `_lardOutput += \`${tpl}\`;`;
      break;
    }
    // plain text
    body += `_lardOutput += \`${tpl.substring(0, i)}\`;`;

    i = i + 2;
    position += i;
    column += i - firstColumnPos;
    tpl = tpl.substring(i);

    i = tpl.indexOf("@>");
    if (tpl[0] === "@") {
      // code to run
      body += tpl.substring(1, i) + ";";
    } else {
      let varN = tpl.substring(0, i);
      let eInfo = `${varN}is undefined`;

      body += `
        try {
          if (${varN} === undefined) {
            throw new TypeError(\`${eInfo}\`)
          } else {
            _lardOutput += ${varN}
          }
        } catch (e) {
          _lardOutput += \`${getPos()}Exp:${varN}\` + e
        }
      `;
    }
    i += 2;
    position += i;
    tpl = tpl.substring(i);
  }

  try {
    let _lardOutput = "";
    eval(declarations + body);
    return _lardOutput;
  } catch (e) {
    console.error("pkg: lark, parsing template error: " + e);
  }
};
