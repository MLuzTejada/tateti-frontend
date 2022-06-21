export interface MoveResponse {
    nextTurn: Player,
    color: string,
    winner: Winner | null,
    tie: boolean
}

interface Player {
    id: number,
    name: string,
    piece: string,
    color: string,
    score: number
}

interface Winner {
    player: Player,
    piece: string,
    score: number
}