const fs = require("fs");

let col1 = [];
let col2 = [];
let diffs = [];
let total = 0;

function sortData(data) {
  let rows = data.split("\n");
  rows.forEach((row) => {
    let rowParts = row.split(" ");

    col1.push(rowParts[0]);
    col2.push(rowParts[3]);
  });
}

function sort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;

    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j = j - 1;
    }
    arr[j + 1] = key;
  }
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
  sort(col1);
  sort(col2);

  for (let i = 0; i < col1.length; i++) {
    if (col1[i] > col2[i]) {
      let diff = col1[i] - col2[i];
      diffs.push(diff);
    } else {
      let diff = col2[i] - col1[i];
      diffs.push(diff);
    }
  }

  for (let k = 0; k < diffs.length; k++) {
    total = total + diffs[k];
  }
  console.log(total);
});
