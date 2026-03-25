import type { CellState } from '../../types/game';
import styles from './Cell.module.css';

interface CellProps {
  cell: CellState;
  index: number;
  isSelected: boolean;
  isHighlighted: boolean;
  isConflict: boolean;
  isSameValue: boolean;
  onClick: (index: number) => void;
}

export function Cell({ cell, index, isSelected, isHighlighted, isConflict, isSameValue, onClick }: CellProps) {
  const row = Math.floor(index / 9);
  const col = index % 9;

  const classNames = [
    styles.cell,
    cell.isGiven && styles.given,
    isSelected && styles.selected,
    isHighlighted && styles.highlighted,
    isConflict && styles.conflict,
    isSameValue && !isSelected && styles.sameValue,
    col % 3 === 2 && col !== 8 && styles.borderRight,
    row % 3 === 2 && row !== 8 && styles.borderBottom,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} onClick={() => onClick(index)}>
      {cell.value !== null ? (
        <span className={styles.value}>{cell.value}</span>
      ) : cell.candidates.size > 0 ? (
        <div className={styles.candidates}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
            <span key={n} className={styles.candidate}>
              {cell.candidates.has(n) ? n : ''}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
