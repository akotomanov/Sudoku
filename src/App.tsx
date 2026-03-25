import { useState, useCallback, useEffect } from 'react';
import type { Difficulty } from './types/game';
import { useGameReducer } from './hooks/useGameReducer';
import { useTimer } from './hooks/useTimer';
import { StartScreen } from './components/StartScreen/StartScreen';
import { Board } from './components/Board/Board';
import { NumberPad } from './components/NumberPad/NumberPad';
import { GameHeader } from './components/GameHeader/GameHeader';
import { WinModal } from './components/WinModal/WinModal';
import { GRID_SIZE } from './utils/constants';
import styles from './App.module.css';

export default function App() {
  const [screen, setScreen] = useState<'start' | 'playing'>('start');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [gameKey, setGameKey] = useState(0);

  const handleSelectDifficulty = useCallback((d: Difficulty) => {
    setDifficulty(d);
    setGameKey((k) => k + 1);
    setScreen('playing');
  }, []);

  const handleNewGame = useCallback(() => {
    setScreen('start');
  }, []);

  if (screen === 'start') {
    return <StartScreen onSelectDifficulty={handleSelectDifficulty} />;
  }

  return <GameScreen key={gameKey} difficulty={difficulty} onNewGame={handleNewGame} />;
}

function GameScreen({ difficulty, onNewGame }: { difficulty: Difficulty; onNewGame: () => void }) {
  const [state, dispatch] = useGameReducer(difficulty);
  const { formatted } = useTimer(!state.isComplete);

  const handleNumber = useCallback((num: number) => {
    if (state.candidateMode) {
      dispatch({ type: 'TOGGLE_CANDIDATE', value: num });
    } else {
      dispatch({ type: 'SET_VALUE', value: num });
    }
  }, [dispatch, state.candidateMode]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (state.isComplete) return;

      if (e.key >= '1' && e.key <= '9') {
        handleNumber(parseInt(e.key));
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        dispatch({ type: 'ERASE' });
      } else if (e.key === 'z' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        dispatch({ type: 'UNDO' });
      } else if (e.key === 'n' || e.key === 'N') {
        dispatch({ type: 'TOGGLE_CANDIDATE_MODE' });
      } else if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
        if (state.selectedCell === null) {
          dispatch({ type: 'SELECT_CELL', index: 0 });
          return;
        }
        const row = Math.floor(state.selectedCell / GRID_SIZE);
        const col = state.selectedCell % GRID_SIZE;
        let newRow = row;
        let newCol = col;
        if (e.key === 'ArrowUp') newRow = Math.max(0, row - 1);
        if (e.key === 'ArrowDown') newRow = Math.min(8, row + 1);
        if (e.key === 'ArrowLeft') newCol = Math.max(0, col - 1);
        if (e.key === 'ArrowRight') newCol = Math.min(8, col + 1);
        dispatch({ type: 'SELECT_CELL', index: newRow * GRID_SIZE + newCol });
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dispatch, handleNumber, state.isComplete, state.selectedCell]);

  return (
    <div className={styles.game}>
      <GameHeader difficulty={difficulty} timerFormatted={formatted} onNewGame={onNewGame} />
      <Board
        board={state.board}
        selectedCell={state.selectedCell}
        conflicts={state.conflicts}
        onCellClick={(index) => dispatch({ type: 'SELECT_CELL', index })}
      />
      <NumberPad
        onNumber={handleNumber}
        onErase={() => dispatch({ type: 'ERASE' })}
        onUndo={() => dispatch({ type: 'UNDO' })}
        onToggleCandidateMode={() => dispatch({ type: 'TOGGLE_CANDIDATE_MODE' })}
        candidateMode={state.candidateMode}
        numberCounts={state.numberCounts}
      />
      {state.isComplete && (
        <WinModal time={formatted} difficulty={difficulty} onNewGame={onNewGame} />
      )}
    </div>
  );
}
