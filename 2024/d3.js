var dataTest = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;

let fs = require("fs");
let data = fs.readFileSync("./2024/d3-input.txt", "utf8");


//part one

var reg = /mul\((\d{1,3}),(\d{1,3})\)/gm

var result = [...data.matchAll(reg)]

console.log(result.length)

var s = 0;
result.forEach((match) => {
  s += match[1] * match[2];
});

console.log(s);

//part two

var reg = /(?:do\(\)|don't\(\)|mul\((\d{1,3}),(\d{1,3})\))/gm

var result = [...data.matchAll(reg)]

console.log(result.length)

var s = 0;
var enable = true;
result.forEach((match) => {
  if (match[0] == "do()") {
    enable = true;
  } else if (match[0] == "don't()") {
    enable = false;
  } else if (enable) {
    s += match[1] * match[2];
  }
});

console.log(s);