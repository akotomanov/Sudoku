import { GRID_SIZE, BOX_SIZE } from './constants';

function isValid(board: (number | null)[], row: number, col: number, num: number): boolean {
  for (let i = 0; i < GRID_SIZE; i++) {
    if (board[row * GRID_SIZE + i] === num) return false;
    if (board[i * GRID_SIZE + col] === num) return false;
  }

  const boxRow = Math.floor(row / BOX_SIZE) * BOX_SIZE;
  const boxCol = Math.floor(col / BOX_SIZE) * BOX_SIZE;
  for (let r = boxRow; r < boxRow + BOX_SIZE; r++) {
    for (let c = boxCol; c < boxCol + BOX_SIZE; c++) {
      if (board[r * GRID_SIZE + c] === num) return false;
    }
  }

  return true;
}

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function generateFilledGrid(): number[] {
  const board: (number | null)[] = new Array(GRID_SIZE * GRID_SIZE).fill(null);

  function fill(index: number): boolean {
    if (index === board.length) return true;

    const row = Math.floor(index / GRID_SIZE);
    const col = index % GRID_SIZE;
    const nums = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);

    for (const num of nums) {
      if (isValid(board, row, col, num)) {
        board[index] = num;
        if (fill(index + 1)) return true;
        board[index] = null;
      }
    }

    return false;
  }

  fill(0);
  return board as number[];
}

export function countSolutions(board: (number | null)[], maxCount: number = 2): number {
  let count = 0;
  const copy = [...board];

  function solve(index: number): boolean {
    while (index < copy.length && copy[index] !== null) index++;
    if (index === copy.length) {
      count++;
      return count >= maxCount;
    }

    const row = Math.floor(index / GRID_SIZE);
    const col = index % GRID_SIZE;

    for (let num = 1; num <= 9; num++) {
      if (isValid(copy, row, col, num)) {
        copy[index] = num;
        if (solve(index + 1)) return true;
        copy[index] = null;
      }
    }

    return false;
  }

  solve(0);
  return count;
}
