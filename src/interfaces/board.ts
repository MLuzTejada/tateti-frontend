export interface Board {
    id: number;
    token: string;
    turn: string;
    winner: number | null;
    squares: string[]
    colors: string[];
    tie: boolean;
}