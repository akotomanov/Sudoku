import type { Difficulty } from '../types/game';

export const GRID_SIZE = 9;
export const BOX_SIZE = 3;
export const TOTAL_CELLS = GRID_SIZE * GRID_SIZE;

export const CLUE_RANGES: Record<Difficulty, [number, number]> = {
  easy: [36, 40],
  medium: [28, 34],
  hard: [22, 27],
};
