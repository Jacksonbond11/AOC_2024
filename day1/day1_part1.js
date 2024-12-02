const fs = require("fs");

let col1 = [];
let col2 = [];
let diffs = [];
let total = 0;

function parseData(data) {
  let rows = data.split("\n");
  rows.forEach((row) => {
    let rowParts = row.split(" ");

    col1.push(Number(rowParts[0]));
    col2.push(Number(rowParts[3]));
  });
}

async function getData() {
  let testData;
  try {
    testData = await fs.promises.readFile("./data.txt", "utf-8");
  } catch (err) {
    console.error("Error reading file:", err);
  }
  return testData;
}
getData().then((data) => {
  parseData(data);
  col1.sort((a, b) => a - b);
  col2.sort((a, b) => a - b);

  for (let i = 0; i < col1.length; i++) {
   total += (Math.abs(col1[i] - col2[i]))
  }
  console.log(total);
});
