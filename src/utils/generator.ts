import type { Difficulty } from '../types/game';
import { CLUE_RANGES, TOTAL_CELLS } from './constants';
import { generateFilledGrid, countSolutions } from './solver';

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function generatePuzzle(difficulty: Difficulty): { puzzle: (number | null)[]; solution: number[] } {
  const solution = generateFilledGrid();
  const puzzle: (number | null)[] = [...solution];

  const [minClues, maxClues] = CLUE_RANGES[difficulty];
  const targetClues = minClues + Math.floor(Math.random() * (maxClues - minClues + 1));
  let cluesRemaining = TOTAL_CELLS;
  const cellsToRemove = cluesRemaining - targetClues;

  const indices = shuffle(Array.from({ length: TOTAL_CELLS }, (_, i) => i));
  let removed = 0;

  for (const idx of indices) {
    if (removed >= cellsToRemove) break;

    const backup = puzzle[idx];
    puzzle[idx] = null;

    if (countSolutions(puzzle, 2) === 1) {
      removed++;
      cluesRemaining--;
    } else {
      puzzle[idx] = backup;
    }
  }

  return { puzzle, solution };
}
