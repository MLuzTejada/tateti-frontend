export interface PlayerResponse {
    message: string;
    board: any;
    players: Player[];
}

interface Player {
    id: number;
    name: string;
    piece: string;
}