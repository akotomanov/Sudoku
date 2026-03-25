import { useReducer } from 'react';
import type { GameState, GameAction, CellState, Difficulty } from '../types/game';
import { generatePuzzle } from '../utils/generator';
import { findConflicts, getNumberCounts } from '../utils/validation';
import { TOTAL_CELLS } from '../utils/constants';

function createInitialState(difficulty: Difficulty): GameState {
  const { puzzle, solution } = generatePuzzle(difficulty);

  const board: CellState[] = puzzle.map((value) => ({
    value,
    candidates: new Set<number>(),
    isGiven: value !== null,
  }));

  return {
    board,
    solution,
    selectedCell: null,
    candidateMode: false,
    conflicts: new Set(),
    numberCounts: getNumberCounts(board),
    history: [],
    difficulty,
    isComplete: false,
  };
}

function checkComplete(board: CellState[], solution: number[]): boolean {
  for (let i = 0; i < TOTAL_CELLS; i++) {
    if (board[i].value !== solution[i]) return false;
  }
  return true;
}

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SELECT_CELL':
      return { ...state, selectedCell: action.index };

    case 'SET_VALUE': {
      if (state.selectedCell === null) return state;
      const cell = state.board[state.selectedCell];
      if (cell.isGiven) return state;

      const newBoard = state.board.map((c, i) =>
        i === state.selectedCell
          ? { ...c, value: action.value, candidates: new Set<number>() }
          : c
      );

      const conflicts = findConflicts(newBoard);
      const numberCounts = getNumberCounts(newBoard);
      const isComplete = conflicts.size === 0 && checkComplete(newBoard, state.solution);

      return {
        ...state,
        board: newBoard,
        conflicts,
        numberCounts,
        isComplete,
        history: [
          ...state.history,
          {
            cellIndex: state.selectedCell,
            previousValue: cell.value,
            previousCandidates: new Set(cell.candidates),
          },
        ],
      };
    }

    case 'TOGGLE_CANDIDATE': {
      if (state.selectedCell === null) return state;
      const cell = state.board[state.selectedCell];
      if (cell.isGiven) return state;

      const newCandidates = new Set(cell.candidates);
      if (newCandidates.has(action.value)) {
        newCandidates.delete(action.value);
      } else {
        newCandidates.add(action.value);
      }

      const newBoard = state.board.map((c, i) =>
        i === state.selectedCell
          ? { ...c, value: null, candidates: newCandidates }
          : c
      );

      const conflicts = findConflicts(newBoard);
      const numberCounts = getNumberCounts(newBoard);

      return {
        ...state,
        board: newBoard,
        conflicts,
        numberCounts,
        history: [
          ...state.history,
          {
            cellIndex: state.selectedCell,
            previousValue: cell.value,
            previousCandidates: new Set(cell.candidates),
          },
        ],
      };
    }

    case 'ERASE': {
      if (state.selectedCell === null) return state;
      const cell = state.board[state.selectedCell];
      if (cell.isGiven) return state;
      if (cell.value === null && cell.candidates.size === 0) return state;

      const newBoard = state.board.map((c, i) =>
        i === state.selectedCell
          ? { ...c, value: null, candidates: new Set<number>() }
          : c
      );

      const conflicts = findConflicts(newBoard);
      const numberCounts = getNumberCounts(newBoard);

      return {
        ...state,
        board: newBoard,
        conflicts,
        numberCounts,
        history: [
          ...state.history,
          {
            cellIndex: state.selectedCell,
            previousValue: cell.value,
            previousCandidates: new Set(cell.candidates),
          },
        ],
      };
    }

    case 'UNDO': {
      if (state.history.length === 0) return state;

      const lastEntry = state.history[state.history.length - 1];
      const newBoard = state.board.map((c, i) =>
        i === lastEntry.cellIndex
          ? { ...c, value: lastEntry.previousValue, candidates: new Set(lastEntry.previousCandidates) }
          : c
      );

      const conflicts = findConflicts(newBoard);
      const numberCounts = getNumberCounts(newBoard);

      return {
        ...state,
        board: newBoard,
        conflicts,
        numberCounts,
        history: state.history.slice(0, -1),
      };
    }

    case 'TOGGLE_CANDIDATE_MODE':
      return { ...state, candidateMode: !state.candidateMode };

    default:
      return state;
  }
}

export function useGameReducer(difficulty: Difficulty) {
  return useReducer(gameReducer, difficulty, createInitialState);
}

export { createInitialState, gameReducer };
