const {readFileSync} = require("fs");

const NUMBER_REGEX = /\d/g;

const contents = readFileSync("input.txt").toString("utf-8");
const lines = contents.split('\n');
const callibrationValues = [];
for (let line of lines) {

    const matches = line.match(NUMBER_REGEX)

    if (matches === null || matches.length === 0) {
        continue;
    }

    const digits = [
        matches.at(0),
        matches.at(matches.length - 1)
    ];

    callibrationValues.push(digits.join(""));
}
console.log(callibrationValues.reduce((previousValue, currentValue) => {
    return previousValue + Number.parseInt(currentValue, 10)
}, 0))