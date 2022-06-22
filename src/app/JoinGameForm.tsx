import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/commons/Button";
import ErrorMessage from "../components/commons/ErrorMessage";
import { joinGame } from "../services/boardService";
import { useSessionUser } from "../store/userStore";

interface JoinGameFormProps {
    setBoardId: (boardId: number) => void;
    setPlayer2: (player2: { id: number, name: string }) => void;
    setGame: (game: string) => void;
}

export default function JoinGameForm(props: JoinGameFormProps) {
    let navigate = useNavigate();
    const user = useSessionUser();
    const [game, setGame] = useState("");
    const [error, setError] = useState("");

    const handleClick = async () => {
        try {
            if (user) {
                const response = await joinGame(user.id, game);
                props.setPlayer2({ name: response.players[1].name, id: response.players[1].id });
                props.setBoardId(response.board.id);
                props.setGame(response.board.token);
                navigate("/game");
            } else {
                setError("Debe iniciar sesion");
                navigate("/");
            }
        } catch (error: any) {
            setError(error.response.data.message);
            throw error;
        }
    }


    return (
        <div>
            <div>
                <form className="form">
                    <label className="form_label">
                        Id partida: #
                    </label>
                    <input type="text" name="game" className="input" required onChange={(event) => setGame(event.target.value)} ></input><br></br>
                    <Button
                        value={"Jugar"}
                        className={"start_button"}
                        onClick={handleClick}
                    />
                </form>
                <ErrorMessage error={error} />
            </div>
        </div>
    )
}