import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../components/commons/Button";
import { logout } from "../services/playerService";
import { useSessionUser } from "../store/userStore";
import ErrorMessage from "../components/commons/ErrorMessage";
import './MainMenu.css';
import { newGame } from "../services/boardService";

interface MenuProps {
    setBoardId: (boardId: number) => void;
    setPlayer1: (player1: { id: number, name: string }) => void;
    setGame: (game: string) => void;
    game: string;
}

export default function MainMenu(props: MenuProps) {
    let navigate = useNavigate();
    const user = useSessionUser();
    const [error, setError] = useState("");

    const handleClick = async () => {
        try {
            if (user) {
                logout(user.id);
                navigate("/");
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    const newGameClick = async () => {
        try {
            if (user) {
                const response = await newGame(user.id);
                props.setGame(response.board.token);
                props.setBoardId(response.board.id);
                props.setPlayer1({ name: response.players[0].name, id: response.players[0].id });
                navigate("/game");
            } else {
                setError("Debe iniciar sesion");
                navigate("/");
            }
        } catch (error: any) {
            console.log(error);
            setError(error.response.data.message);
            throw error;
        }
    }

    return (
        <div>
            <div className="card">
                <img className="img" src="/assets/TATETI.png" alt="Avatar"></img>
                <div className="container">
                    <Button
                        value={"Nueva Partida"}
                        className={"new_game"}
                        onClick={newGameClick}
                    />
                    <NavLink to="/joinGame">
                        <Button
                            value={"Unirse a una partida"}
                            className={"join_game"}
                        />
                    </NavLink>
                    <Button
                        value={"Cerrar Sesion"}
                        className={"logout"}
                        onClick={handleClick}
                    />
                </div>
            </div>

            <ErrorMessage error={error} />
        </div>

    )
}