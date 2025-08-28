// console.log("hello naveen");
let matrix = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

const totalRows = matrix.length;

const totalColumns = matrix[0].length;

console.log(`Matrix contains ${totalRows} Rows & ${totalColumns} Columns`);

const squareMatrix = [
  [1, 1],
  [1, 1],
];

const LMatrix = [
  [1, 0, 0],
  [1, 1, 1],
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
      columnEndIdx = columnStartIdx + shape[shapeRowIdx].lastIndexOf(1) + 1;
      while (i < columnEndIdx && row[i] == 0) {
        i += 1;
      }
      if (i < columnEndIdx - 1) {
        temp = false;
      }
      shapeRowIdx += 1;
    }

    if (!temp) break;

    result = JSON.parse(JSON.stringify(matrix));

    if (rowIdx <= totalRows - shape.length) {
      let shapeRowIdx = 0;
      while (shapeRowIdx < shape.length) {
        columnEndIdx = columnStartIdx + shape[shapeRowIdx].lastIndexOf(1) + 1;
        for (let j = columnStartIdx; j < columnEndIdx; j++) {
          result[rowIdx + shapeRowIdx][j] = 1;
        }
        shapeRowIdx += 1;
      }
    }

    rowIdx += 1;
  }

  if (result.length) {
    matrix = JSON.parse(JSON.stringify(result));
  }
};

for (let index = 0; index < 4; index++) {
  const shapes = [squareMatrix, LMatrix];
  const shape = shapes[index % shapes.length];
  loadShape(shape, index > 0 ? index * 2 : index);
}

console.log(JSON.stringify(matrix, null, 3));
