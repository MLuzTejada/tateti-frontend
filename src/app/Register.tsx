import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/commons/Button";
import Text from "../components/commons/Text";
import { newUser } from "../services/playerService";

export default function Register() {
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");

  const registerClick = async () => {
    if (password !== password2) {
      setError("Las contraseñas no coinciden");
      throw new Error();
    }
    try {
      await newUser({
        name,
        password,
      })
      navigate("/");
    } catch (error: any) {
      if (error.response.data.password) {
        setError("Las contraseña debe cumplir con el formato");
      }
      throw error;
    }
  }

  return (
    <form className="form">
      <Text value={"Registrarse"} />
      <label className="form_label">Nombre</label>
      <input type="text" className="input" required onChange={(e) => setName(e.target.value)}></input><br></br>
      <label className="form_label">Contraseña</label>
      <input type="password" className="input" required onChange={(e) => setPassword(e.target.value)}></input><br></br>
      <label className="form_label">Repita la contraseña</label>
      <input type="password" className="input" required onChange={(e) => setPassword2(e.target.value)}></input><br></br>
      <div style={{ color: "gray" }}>
        <text>La contraseña debe tener:</text>
        <ul>
          <li>Al menos 8 caracteres</li>
          <li>Mínimo una letra</li>
          <li>Mínimo un número</li>
        </ul>
      </div>
      <text style={{ color: "red" }}>{error}</text><br></br>
      <text>¿Ya estas registrado? <a href="/" >Inicia sesión</a></text>
      <Button
        value={"Registrarse"}
        className={"register_button"}
        onClick={registerClick}
      />
    </form>
  )
}