import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getBoardByPlayerId, makeMove, otherRound } from '../services/boardService';
import { getPlayerById } from '../services/playerService';
import { useSessionUser } from '../store/userStore';
import Board from './Board';
import Button from './commons/Button';
import ErrorMessage from './commons/ErrorMessage';
import SuccessMessage from './commons/SuccessMessage';
import Text from './commons/Text';
import './game.css';
import ScoreBoard from './ScoreBoard';

interface BoardProps {
  board: number;
  player1: Player
  player2: Player;
  game: string;
}

interface Player {
  id: number;
  name: string;
}

export default function Game(props: BoardProps) {
  const user = useSessionUser();
  const [turn, setTurn] = useState({ piece: "X" });
  const [boardId] = useState(props.board);
  const [board, setBoard] = useState({ squares: Array(9).fill(null), colors: Array(9).fill(null) })
  const [score, setScore] = useState({ X: 0, O: 0 });
  const [info, setInfo] = useState("");
  const [winner, setWinner] = useState("");
  const [gameToken, setGameToken] = useState(props.game);
  const [disableBoard, setDisableBoard] = useState(false);
  const [error, setError] = useState("");
  const [showOtherGame, setshowOtherGame] = useState(false);


  useEffect(() => {
    let timer: any = 0;

    timer = setInterval(
      () => getBoard(),
      1000
    )

    if (turn.piece !== user?.piece) {
      setDisableBoard(true);
    } else {
      setDisableBoard(false);
    }

    async function getBoard() {
      const response = await getBoardByPlayerId(user?.id);
      console.log("board: ", response);
      console.log("token: ", response.turn);
      setGameToken(response.token);
      setBoard({ squares: response.squares, colors: response.colors });
      setTurn({ ...turn, piece: response.turn });
      console.log(turn.piece);
      if (response.tie) {
        setInfo("Es un empate");
        setDisableBoard(true);
        setshowOtherGame(true);
        return
      }
      if (response.winner) {
        const data = await getPlayerById(response.winner);
        setScore({ ...score, [data.piece]: data.score });
        setInfo("");
        setWinner(data.name + " ganó");
        setDisableBoard(true);
        setshowOtherGame(true);
        return
      }
      setWinner("");
      if (turn.piece != null) {
        setInfo("Juega " + turn.piece);
      }
    }

    return () => {
      clearInterval(timer);
    }
  }, [board, boardId, info, props.board, score, turn, user, user?.piece]);


  const cleanBoard = async () => {
    try {
      if (user) {
        const response = await otherRound(gameToken, user.id);
        console.log("response other round", response);
      }
    } catch (error: any) {
      setError(error.response.data.message);
      throw error;
    }
  }

  const handleMove = async (i: number) => {
    try {
      if (user) {
        setError("");
        return await makeMove(user.id, i, turn.piece, gameToken);
      }
    } catch (error: any) {
      setError(error.response.data.message);
      throw error;
    }
  }

  return (
    <div className="game">
      <div className="game_info">
        <Text
          value={"Partida: #" + gameToken}
        />
      </div>
      <div className="status">
        {winner ? <SuccessMessage value={winner} /> : null}
        {info ? <Text value={info} /> : null}
        {error ? <ErrorMessage error={error} /> : null}
      </div>
      <div className="game_board">
        <Board
          board={board}
          disabled={disableBoard}
          onClick={handleMove}
        />
      </div>
      <div className="points">
        <ScoreBoard
          scoreX={score.X}
          scoreO={score.O}
        />
      </div>
      <NavLink to="/game">
        {showOtherGame ?
          <Button
            value={"Otra ronda"}
            className={"other_game"}
            onClick={cleanBoard}
          />
          : null
        }
      </NavLink>
      <NavLink to="/menu">
        <Button
          value={"Volver al Menu"}
          className={"back_to_menu"}
        />
      </NavLink>
    </div>
  )

}