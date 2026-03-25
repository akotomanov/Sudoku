export type Difficulty = 'easy' | 'medium' | 'hard';

export interface CellState {
  value: number | null;
  candidates: Set<number>;
  isGiven: boolean;
}

export interface HistoryEntry {
  cellIndex: number;
  previousValue: number | null;
  previousCandidates: Set<number>;
}

export interface GameState {
  board: CellState[];
  solution: number[];
  selectedCell: number | null;
  candidateMode: boolean;
  conflicts: Set<number>;
  numberCounts: number[];
  history: HistoryEntry[];
  difficulty: Difficulty;
  isComplete: boolean;
}

export type GameAction =
  | { type: 'SELECT_CELL'; index: number }
  | { type: 'SET_VALUE'; value: number }
  | { type: 'TOGGLE_CANDIDATE'; value: number }
  | { type: 'ERASE' }
  | { type: 'UNDO' }
  | { type: 'TOGGLE_CANDIDATE_MODE' };
