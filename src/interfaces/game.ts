import { Board } from "./board";
import { Player } from "./player";

export interface Game {
    message: string;
    board: Board;
    players: Player[];
}