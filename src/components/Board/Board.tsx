import type { CellState } from '../../types/game';
import { Cell } from '../Cell/Cell';
import { GRID_SIZE, BOX_SIZE } from '../../utils/constants';
import styles from './Board.module.css';

interface BoardProps {
  board: CellState[];
  selectedCell: number | null;
  conflicts: Set<number>;
  onCellClick: (index: number) => void;
}

export function Board({ board, selectedCell, conflicts, onCellClick }: BoardProps) {
  const selectedValue = selectedCell !== null ? board[selectedCell].value : null;

  function isHighlighted(index: number): boolean {
    if (selectedCell === null) return false;
    if (index === selectedCell) return false;

    const selRow = Math.floor(selectedCell / GRID_SIZE);
    const selCol = selectedCell % GRID_SIZE;
    const row = Math.floor(index / GRID_SIZE);
    const col = index % GRID_SIZE;

    if (row === selRow || col === selCol) return true;

    const selBoxRow = Math.floor(selRow / BOX_SIZE);
    const selBoxCol = Math.floor(selCol / BOX_SIZE);
    const boxRow = Math.floor(row / BOX_SIZE);
    const boxCol = Math.floor(col / BOX_SIZE);

    return boxRow === selBoxRow && boxCol === selBoxCol;
  }

  return (
    <div className={styles.board}>
      {board.map((cell, index) => (
        <Cell
          key={index}
          cell={cell}
          index={index}
          isSelected={index === selectedCell}
          isHighlighted={isHighlighted(index)}
          isConflict={conflicts.has(index)}
          isSameValue={selectedValue !== null && cell.value === selectedValue}
          onClick={onCellClick}
        />
      ))}
    </div>
  );
}
