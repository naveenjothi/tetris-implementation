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

const hasCollision = (
  shape: number[][],
  boardRowIdx: number,
  columnStartIdx: number
): boolean => {
  let shapeRowIdx = 0;

  while (shapeRowIdx < shape.length) {
    const shapeRow = shape[shapeRowIdx];
    const boardRow = matrix?.[boardRowIdx + shapeRowIdx] ?? [];
    let i = columnStartIdx;
    const columnEndIdx = columnStartIdx + shapeRow.lastIndexOf(1) + 1;
    while (
      i < columnEndIdx &&
      shapeRow[i - columnStartIdx] == 1 &&
      boardRow[i] == 0
    ) {
      i += 1;
    }
    if (i < columnEndIdx - 1) {
      return true;
    }
    shapeRowIdx += 1;
  }
  return false;
};

const placeShape = (
  shape: number[][],
  boardRowIdx: number,
  columnStartIdx: number
) => {
  const newBoard = JSON.parse(JSON.stringify(matrix));

  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (shape[r][c] == 1) {
        newBoard[boardRowIdx + r][columnStartIdx + c] = 1;
      }
    }
  }

  matrix = newBoard;
};

const loadShape = (shape: number[][], columnStartIdx: number) => {
  let columnEndIdx = columnStartIdx + shape[0].length;

  //   condition to validate shape doesn't goes outside the container
  if (columnEndIdx > totalColumns) {
    columnStartIdx = totalColumns - shape[0].length;
    columnEndIdx = totalColumns;
  }

  let rowIdx = 0;
  while (true) {
    console.log("Rendering Row", rowIdx);

    if (hasCollision(shape, rowIdx + 1, columnStartIdx)) break;

    rowIdx += 1;
  }

  placeShape(shape, rowIdx, columnStartIdx);
};

for (let index = 0; index < 4; index++) {
  const shapes = [squareMatrix, LMatrix];
  const shape = shapes[index % shapes.length];
  loadShape(shape, index > 0 ? index * 2 : index);
}

console.log(JSON.stringify(matrix, null, 3));
