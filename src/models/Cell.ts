import { Board } from "./Board";
import { Colors } from "./Colors";
import { Figure } from "./figures/Figure";

export class Cell {
    readonly x: number;
    readonly y: number;
    readonly color: Colors;
    figure: Figure | null;
    board: Board;
    available: boolean; // Можно ли переместиться?
    id: number; // для реакт ключей
    constructor(board: Board, x: number, y: number, color: Colors, figure: Figure | null) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.available = false;
        this.board = board;
        this.figure = figure;
        this.id = Math.random();
    }
    isEmpty() {
        return this.figure === null;
    }
    isEmptyVertical(target: Cell): boolean {
        if (this.x !== target.x) {
            return false;
        }
        const min = Math.min(this.y, target.y);
        const max = Math.max(this.y, target.y);
        for (let y = min + 1; y < max; y++) {
            if (!this.board.getCell(this.x, y).isEmpty()) {
                return false;
            }
        }
        return true;
    }
    isEmptyHorizontal(target: Cell): boolean {
        return true;
    }
    isEmptyVerticalDiagonal(target: Cell): boolean {
        return true;
    }
    moveFigure(target: Cell) {
        if (this.figure && this.figure?.canMove(target)) {
            this.figure.moveFigure(target);
            target.figure = this.figure;
            this.figure = null;
        }
    }
}
