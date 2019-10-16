module.exports = 
function solveSudoku(matrix) {
	const nextCell = findEmpty(matrix);
	if (!nextCell) return matrix; 

	let [row, col] = nextCell;
	const values = findValues(row, col, matrix);
  if (values.length) {
      for (let value of values) {
      matrix[row][col] = value;
			solveSudoku(matrix);
			if(!findEmpty(matrix)) return matrix;
		}
    matrix[row][col] = 0;
	}
}

const findEmpty = matrix => {
	for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
			if (matrix[row][col] === 0) return [row, col];
		}
	}
	return false;
}

const helper = num => Math.floor(num / 3) * 3;

const findValues = (row, col, matrix) => {
  const values = new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  matrix[row].forEach(el => values.delete(el));
  for (let row = 0; row < 9; row++) {
    values.delete(matrix[row][col]);
  } 
  for (let r = helper(row), lastRow = r + 3; r < lastRow; r++) {
    for (let c = helper(col), lastCol = c + 3; c < lastCol; c++) {
      values.delete(matrix[r][c]);
    }
  }
  return Array.from(values);
}
