import UndoIcon from '../icons/UndoIcon';
import BackspaceIcon from '../icons/BackspaceIcon';
import EditIcon from '../icons/EditIcon';
import styles from './NumberPad.module.css';

interface NumberPadProps {
  onNumber: (num: number) => void;
  onErase: () => void;
  onUndo: () => void;
  onToggleCandidateMode: () => void;
  candidateMode: boolean;
  numberCounts: number[];
}

export function NumberPad({ onNumber, onErase, onUndo, onToggleCandidateMode, candidateMode, numberCounts }: NumberPadProps) {
  return (
    <div className={styles.container}>
      <div className={styles.numbers}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => {
          const exhausted = numberCounts[num] >= 9;
          return (
            <button
              key={num}
              className={`${styles.numButton} ${exhausted ? styles.exhausted : ''}`}
              onClick={() => onNumber(num)}
              disabled={exhausted}
            >
              {num}
              <span className={styles.shortcut}>{num}</span>
            </button>
          );
        })}
      </div>
      <div className={styles.actions}>
        <button className={styles.actionButton} onClick={onUndo}>
          <span className={styles.actionIcon}><UndoIcon /></span>
          <span className={styles.actionLabel}>Undo</span>
        </button>
        <button className={styles.actionButton} onClick={onErase}>
          <span className={styles.actionIcon}><BackspaceIcon /></span>
          <span className={styles.actionLabel}>Erase</span>
        </button>
        <button
          className={`${styles.actionButton} ${candidateMode ? styles.active : ''}`}
          onClick={onToggleCandidateMode}
        >
          <span className={styles.actionIcon}><EditIcon /></span>
          <span className={styles.actionLabel}>Notes</span>
        </button>
      </div>
    </div>
  );
}
