const fs = require("fs");

let col1 = [];
let col2 = [];
let score = 0;

function sortData(data) {
  let rows = data.split("\n");
  rows.forEach((row) => {
    let rowParts = row.split(" ");

    col1.push(rowParts[0]);
    col2.push(rowParts[3]);
  });
}

function getSimilarityScore(val, arr) {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    if ((val === arr[i])) {
      count = count + 1;
    }
  }
  return count;
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
  sortData(data);

  for (let i = 0; i < col1.length; i++) {
    let count = getSimilarityScore(col1[i], col2);
    score = score + (col1[i] * count);
  }

  console.log(score);
});
