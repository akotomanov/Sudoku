import type { CellState } from '../types/game';
import { GRID_SIZE, BOX_SIZE } from './constants';

export function findConflicts(board: CellState[]): Set<number> {
  const conflicts = new Set<number>();

  for (let i = 0; i < board.length; i++) {
    const val = board[i].value;
    if (val === null) continue;

    const row = Math.floor(i / GRID_SIZE);
    const col = i % GRID_SIZE;

    // Check row
    for (let c = 0; c < GRID_SIZE; c++) {
      const j = row * GRID_SIZE + c;
      if (j !== i && board[j].value === val) {
        conflicts.add(i);
        conflicts.add(j);
      }
    }

    // Check column
    for (let r = 0; r < GRID_SIZE; r++) {
      const j = r * GRID_SIZE + col;
      if (j !== i && board[j].value === val) {
        conflicts.add(i);
        conflicts.add(j);
      }
    }

    // Check box
    const boxRow = Math.floor(row / BOX_SIZE) * BOX_SIZE;
    const boxCol = Math.floor(col / BOX_SIZE) * BOX_SIZE;
    for (let r = boxRow; r < boxRow + BOX_SIZE; r++) {
      for (let c = boxCol; c < boxCol + BOX_SIZE; c++) {
        const j = r * GRID_SIZE + c;
        if (j !== i && board[j].value === val) {
          conflicts.add(i);
          conflicts.add(j);
        }
      }
    }
  }

  return conflicts;
}

export function getNumberCounts(board: CellState[]): number[] {
  const counts = new Array(10).fill(0);
  for (const cell of board) {
    if (cell.value !== null) {
      counts[cell.value]++;
    }
  }
  return counts;
}
