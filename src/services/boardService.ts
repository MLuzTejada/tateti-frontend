import axios from "axios";
import { baseUrl } from "../config/default";
import { MoveResponse } from "../interfaces/moveResponse";
import { getCurrentToken, reloadCurrentUser } from "./playerService";
import { PlayerResponse } from '../interfaces/playerResponse';

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
axios.defaults.headers.common["Content-Type"] = "application/json"


export async function getBoardByPlayerId(id?: number) {
  const url2 = `https://localhost:3000/boards/${id}`
  try {
    const { data } = await axios.get(url2);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function makeMove(id: number, squareNumber: number, game_piece: string, token: string): Promise<MoveResponse> {
  const url = `https://localhost:3000/make_move`;
  try {
    const { data } = await axios.post(url, {
      id,
      move: squareNumber,
      game_piece,
      token
    });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function newGame(id: number): Promise<PlayerResponse> {
  try {
    const { data } = await axios.post<PlayerResponse>(baseUrl + "/new_game", {
      id
    });
    reloadCurrentUser(data.players[0]);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}


export async function joinGame(id: number, token: string): Promise<any> {
  try {
    const url2 = `https://localhost:3000/join_game`;

    const { data } = await axios.post<any>(url2, {
      id,
      token
    });
    reloadCurrentUser(data.players[1]);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }

}

export async function otherRound(token: string, id: number): Promise<any> {
  try {
    const url = `https://localhost:3000/other_round`;

    const { data } = await axios.post<any>(url, {
      id,
      token
    });
    console.log("other round", data);
    return data;
  } catch (error) {
    console.log(error);
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

