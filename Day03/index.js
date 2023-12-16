const { readFileSync } = require("fs");

const contents = readFileSync("example.txt").toString("utf-8");
const lines = contents.split("\n");

const allNumbers = [];
const allSymbols = [];

for (let i = 0; i < lines.length; i++) {
  const numbers = lines[i].match(/\d+/g);
  if (numbers) {
    allNumbers.push(
      numbers.flatMap((num) => {
        const value = Number.parseInt(num);
        const start = lines[i].indexOf(num);
        const end = start + num.length - 1;
        return {
          value,
          start,
          end,
          line: i,
        };
      }),
    );
  }

  const symbols = lines[i].match(/[*#+$%=/-]/g);
  if (symbols) {
    allSymbols.push(
      symbols.flatMap((sym) => {
        return {
          symbol: sym,
          start: lines[i].indexOf(sym),
          line: i,
        };
      }),
    );
  }
}

const result = allNumbers.flat().reduce((prev, curr) => {
  /*
        Adjacent if...
        if line - 1 and symbol index is within the range of start - 1 to end + 1
        if line + 1 and symbol index is within the range of start - 1 to end + 1
        if line == num.line and symbol index is start - 1 || end + 1
    */
  const adjacent = allSymbols.flat().find((sym) => {
    return (
      (sym.start >= curr.start - 1 &&
        sym.start <= curr.end + 1 &&
        (sym.line === curr.line - 1 || sym.line === curr.line + 1)) ||
      (sym.line === curr.line &&
        (sym.start === curr.start - 1 || sym.start === curr.end + 1))
    );
  });

  if (adjacent) {
    return prev + curr.value;
  }

  return prev;
}, 0);

console.log(result);
