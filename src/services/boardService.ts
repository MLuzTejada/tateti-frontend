import axios from "axios";
import { baseUrl } from "../config/default";
import { getCurrentToken, reloadCurrentUser } from "./playerService";
import { Game } from "../interfaces/game";
import { Board } from "../interfaces/board";
import { Move } from "../interfaces/move";

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
axios.defaults.headers.common["Content-Type"] = "application/json"


export async function getBoardByPlayerId(id?: number): Promise<Board> {
  try {
    const { data } = await axios.get<Board>(baseUrl + `/boards/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function makeMove(id: number, squareNumber: number, game_piece: string, token: string): Promise<Move> {
  try {
    const { data } = await axios.post<Move>(baseUrl + "/make_move", {
      id,
      move: squareNumber,
      game_piece,
      token
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function newGame(id: number): Promise<Game> {
  try {
    const { data } = await axios.post<Game>(baseUrl + "/new_game", {
      id
    });
    reloadCurrentUser(data.players[0]);
    return data;
  } catch (error) {
    throw error;
  }
}


export async function joinGame(id: number, token: string): Promise<Game> {
  try {
    const { data } = await axios.post<Game>(baseUrl + "/join_game", {
      id,
      token
    });
    reloadCurrentUser(data.players[1]);
    return data;
  } catch (error) {
    throw error;
  }

}

export async function otherRound(token: string, id: number): Promise<Game> {
  try {
    const { data } = await axios.post<Game>(baseUrl + "/other_round", {
      id,
      token
    });
    return data;
  } catch (error) {
    throw error;
  }

}

if (getCurrentToken()) {
  const currentToken = getCurrentToken();
  if (currentToken !== undefined) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    axios.defaults.headers.common.Authorization = currentToken;
  }
}

