import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/commons/Button";
import Text from "../components/commons/Text";
import { login } from "../services/playerService";

export default function Login() {
    let navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const loginClick = async () => {

        try {
            await login({
                name: userName,
                password
            })
            navigate("/menu");
        } catch (error) {
            console.log(error);
            setError("Revisa los datos que ingresaste");
            throw error;
        }
    }

    return (
        <form className="form">
            <Text value={"Iniciar sesión"} />
            <label className="form_label">Nombre</label>
            <input type="text" className="input" required onChange={(event) => setUserName(event.target.value)}></input><br></br>
            <label className="form_label">Contraseña</label>
            <input type="password" className="input" required onChange={(event) => setPassword(event.target.value)}></input><br></br>
            <text style={{ color: "red" }}>{error}</text><br></br>
            <text>¿No estas registrado? <a href="/register" >Registrate</a></text>
            <Button
                value={"Iniciar sesión"}
                className={"login_button"}
                onClick={loginClick}
            />
        </form>
    )
}