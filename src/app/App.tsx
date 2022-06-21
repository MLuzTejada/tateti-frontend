import { useState } from "react"
import {
    BrowserRouter as Router, Route, Routes
} from "react-router-dom"
import { StateLoggedInRoute } from "../components/commons/LoggedInRoute"
import Game from "../components/Game"
import JoinGameForm from "./JoinGameForm"
import Login from "./Login"
import MainMenu from "./MainMenu"
import Register from "./Register"
import './App.css';

interface Player {
    id: number;
    name: string;
}

export default function App() {
    const [boardId, setBoardId] = useState<number>(0);
    const [game, setGame] = useState<string>("");
    const [player1, setPlayer1] = useState<Player>({ id: 0, name: "" });
    const [player2, setPlayer2] = useState<Player>({ id: 0, name: "" });

    return (
        <table className="app_table">
            <thead>
            </thead>
            <tbody>
                <tr>
                    <td id="content" className="app_content">
                        <Router>
                            <Routes>
                                <Route element={<StateLoggedInRoute />}>
                                    <Route
                                        path="/joinGame"
                                        element={
                                            <JoinGameForm
                                                setBoardId={setBoardId}
                                                setPlayer2={setPlayer2}
                                                setGame={setGame}

                                            />
                                        }
                                    />
                                    <Route
                                        path="/game"
                                        element={
                                            <Game
                                                board={boardId}
                                                player1={player1}
                                                player2={player2}
                                                game={game}
                                            />
                                        }
                                    />
                                    <Route
                                        path="/menu"
                                        element={
                                            <MainMenu
                                                setBoardId={setBoardId}
                                                setPlayer1={setPlayer1}
                                                game={game}
                                                setGame={setGame}
                                            />
                                        }
                                    />
                                </Route>
                                <Route
                                    path="/register"
                                    element={
                                        <Register />
                                    }
                                />
                                <Route
                                    path="/"
                                    element={
                                        <Login />
                                    }
                                />

                            </Routes>
                        </Router >
                    </td>
                </tr>
            </tbody>
        </table>
    )
}