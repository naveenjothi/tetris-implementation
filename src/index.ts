// console.log("hello naveen");
let matrix = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
];

const totalRows = matrix.length;

const totalColumns = matrix[0].length;

console.log(`Matrix contains ${totalRows} Rows & ${totalColumns} Columns`);

const squareMatrix = [
  [1, 1],
  [1, 1],
];

const loadShape = (shape: number[][], columnStartIdx: number) => {
  let columnEndIdx = columnStartIdx + shape[0].length;

  //   condition to validate shape doesn't goes outside the container
  if (columnEndIdx > totalColumns) {
    columnStartIdx = totalColumns - shape[0].length;
    columnEndIdx = totalColumns;
  }

  let result: number[][] = [];

  let rowIdx = 0;
  while (rowIdx < totalRows) {
    console.log("Rendering Row", rowIdx);
    let temp = true;
    let shapeRowIdx = 0;

    while (shapeRowIdx < shape.length) {
      const row = matrix?.[rowIdx + shapeRowIdx] ?? [];
      let i = columnStartIdx;
      while (columnEndIdx < row.length && i < columnEndIdx) {
        if (row[i] == 0) {
          i += 1;
        }
        break;
      }
      if (i < columnEndIdx - 1) {
        temp = false;
      }
      shapeRowIdx += 1;
    }

    if (!temp) break;

    result = JSON.parse(JSON.stringify(matrix));

    if (rowIdx <= totalRows - shape.length) {
      for (let i = rowIdx; i < rowIdx + shape.length; i++) {
        for (let j = columnStartIdx; j < columnEndIdx; j++) {
          result[i][j] = 1;
        }
      }
    }

    rowIdx += 1;
  }
  matrix = JSON.parse(JSON.stringify(result));

  console.log(JSON.stringify(matrix, null, 3));
};

for (let index = 0; index < 3; index++) {
  loadShape(squareMatrix, index);
}
