import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  filter,
  map,
  Observable,
  Subject,
  takeUntil,
  tap,
} from 'rxjs';

type Player = 'blue' | 'red';

interface BoardCell {
  id: number;
  won: Player | null;
  emoji: string;
  flipped: boolean;
}

@Component({
  selector: 'app-game-board',
  standalone: false,
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.css',
})
export class GameBoardComponent implements OnInit, OnDestroy {
  private readonly BOARD_SIZE = 16;
  private readonly WIN_SCORE = this.BOARD_SIZE / 2 / 2;
  private readonly EMOJIS = [
    '🐵',
    '🐶',
    '🦊',
    '🐱',
    '🦁',
    '🐯',
    '🐴',
    '🦄',
    '🦓',
    '🦌',
    '🐮',
    '🐷',
    '🐭',
    '🐹',
    '🐻',
    '🐨',
    '🐼',
    '🐽',
    '🐸',
    '🐰',
    '🐙',
  ];
  boardCellsSubject = new BehaviorSubject<BoardCell[]>([]);
  boardCells$ = this.boardCellsSubject.asObservable();
  flippedCellsSubject = new BehaviorSubject<BoardCell[]>([]);
  flippedCells$ = this.flippedCellsSubject.asObservable();
  blueScore = 0;
  redScore = 0;
  winner: Player | 'draw' | null = null;

  currentPlayer: Player = 'blue';
  private destroy$ = new Subject<void>();

  constructor() {
    this.resetBoard();
  }

  ngOnInit() {
    this.boardCells$.pipe(takeUntil(this.destroy$)).subscribe((cells) => {
      this.blueScore = cells.filter((c) => c.won === 'blue').length / 2;
      this.redScore = cells.filter((c) => c.won === 'red').length / 2;
      this.winner =
        this.blueScore > this.WIN_SCORE
          ? 'blue'
          : this.redScore > this.WIN_SCORE
          ? 'red'
          : this.blueScore === this.WIN_SCORE &&
            this.redScore === this.WIN_SCORE
          ? 'draw'
          : null;
    });

    this.boardCells$
      .pipe(
        map((cells) => cells.filter((c) => c.won === null && c.flipped)),
        takeUntil(this.destroy$)
      )
      .subscribe((cells) => {
        this.flippedCellsSubject.next(cells);
      });

    this.flippedCells$
      .pipe(
        filter((cells) => cells.length === 2),
        takeUntil(this.destroy$)
      )
      .subscribe((cells) => {
        const [cell1, cell2] = cells;
        if (cell1.emoji === cell2.emoji) {
          setTimeout(() => {
            this.boardCellsSubject.next(
              this.currentBoardCells.map((c) => {
                if (c.id !== cell1.id && c.id !== cell2.id) return c;

                return {
                  ...c,
                  won: this.currentPlayer,
                };
              })
            );
          }, 500);
        } else {
          setTimeout(() => {
            this.boardCellsSubject.next(
              this.currentBoardCells.map((c) => {
                if (c.id !== cell1.id && c.id !== cell2.id) return c;

                return { ...c, flipped: false };
              })
            );
          }, 500);
        }

        this.currentPlayer = this.currentPlayer === 'blue' ? 'red' : 'blue';
      });
  }

  onFlip(cell: BoardCell) {
    if (cell.flipped || cell.won) return;
    if (this.currentFlippedCells.length >= 2) return;

    this.boardCellsSubject.next(
      this.currentBoardCells.map((c) => {
        if (c.id !== cell.id) return c;

        return {
          ...cell,
          flipped: true,
        };
      })
    );
  }

  resetBoard() {
    this.resetCells();
    this.currentPlayer = 'blue';
    this.flippedCellsSubject.next([]);
  }

  resetCells() {
    const halfEmojis = this.shuffleArray(this.EMOJIS).slice(
      0,
      this.BOARD_SIZE / 2
    );
    const fullEmojis = [...halfEmojis, ...halfEmojis];
    this.boardCellsSubject.next(
      this.shuffleArray(fullEmojis).map((emoji, i) => ({
        id: i,
        emoji,
        won: null,
        flipped: false,
      }))
    );
  }

  private shuffleArray<T = unknown>(arr: T[]): T[] {
    let currentIndex = arr.length;
    const shuffledArr = [...arr];

    while (currentIndex > 0) {
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [shuffledArr[currentIndex], shuffledArr[randomIndex]] = [
        shuffledArr[randomIndex],
        shuffledArr[currentIndex],
      ];
    }

    return shuffledArr;
  }

  get currentBoardCells() {
    return this.boardCellsSubject.getValue();
  }

  get currentFlippedCells() {
    return this.flippedCellsSubject.getValue();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
