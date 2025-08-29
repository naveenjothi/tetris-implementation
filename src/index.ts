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

const emptyRow = [0, 0, 0, 0, 0, 0, 0, 0];

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
  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (shape[r][c] === 1) {
        const boardR = boardRowIdx + r;
        const boardC = columnStartIdx + c;
        if (boardR >= totalRows) return true;
        if (matrix[boardR] && matrix[boardR][boardC] === 1) return true;
      }
    }
  }
  return false;
};

const placeShape = (
  shape: number[][],
  boardRowIdx: number,
  columnStartIdx: number
) => {
  const newBoard: number[][] = JSON.parse(JSON.stringify(matrix));

  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (shape[r][c] == 1) {
        newBoard[boardRowIdx + r][columnStartIdx + c] = 1;
      }
    }
  }

  matrix = newBoard;

  for (let rowIdx = totalRows - 1; rowIdx >= 0; rowIdx--) {
    const row = newBoard[rowIdx];
    if (row.every((val) => val === 1)) {
      newBoard.splice(rowIdx, 1);
      newBoard.unshift([...emptyRow]);
      rowIdx++;
    }
  }
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
