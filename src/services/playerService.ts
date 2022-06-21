import axios from 'axios';
import { baseUrl } from '../config/default';
import { updateSessionToken, cleanupSessionToken } from "../store/tokenStore"
import { cleanupSessionUser, updateSessionUser } from "../store/userStore"

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
axios.defaults.headers.common["Content-Type"] = "application/json"

export interface User {
  id: number,
  name: string,
  piece: string
}

export interface Token {
  token: string
}

export async function getPlayerById(id: string): Promise<any> { //TODO revisar si deberia ser number el id
  try {
    const url2 = `https://localhost:3000/players/${id}`;

    const { data } = await axios.get<any>(url2);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }

}

export async function login(params: {
  name: string
  password: string
}): Promise<Token> {
  console.log("entro al login");
  const { data } = await axios.post(baseUrl + "/login", params);
  console.log("response login: ", data);

  setCurrentToken(data.token)
  updateSessionToken(data.token)
  void reloadCurrentUser(data).then()
  return data.token;
}


export function getCurrentToken(): string | undefined {
  const result = localStorage.getItem("token")
  return result ? result : undefined
}

function setCurrentToken(token: string) {
  localStorage.setItem("token", token)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  axios.defaults.headers.common.Authorization = token
}

export function getCurrentUser(): User | undefined {
  const result = localStorage.getItem("user");
  return result ? result as unknown as User : undefined;
}

export async function logout(id: number): Promise<void> {
  localStorage.removeItem("token")
  localStorage.removeItem("user")

  try {
    await axios.get(baseUrl + `/logout/${id}`);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    axios.defaults.headers.common.Authorization = ""
    return
  } catch (err) {
    return
  } finally {
    cleanupSessionToken()
    cleanupSessionUser()
  }
}

export async function reloadCurrentUser(user: User): Promise<User> {
  console.log("dentro del reload: ", user);
  localStorage.setItem("user", JSON.stringify(user));
  updateSessionUser(user);
  return user;
}

export async function newUser(params: {
  name: string
  password: string
}): Promise<Token> {

  const { data } = await axios.post(baseUrl + "/register", params);
  console.log(data);
  setCurrentToken(data.token);
  updateSessionToken(data.token);
  void reloadCurrentUser(data).then()
  return data;
}

if (getCurrentToken()) {
  console.log("entro al if del final");
  const currentUser = getCurrentUser()
  const currentToken = getCurrentToken()
  console.log("currentUser", currentUser);
  console.log("currentToken", currentToken);
  if (currentUser !== undefined && currentToken !== undefined) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    axios.defaults.headers.common.Authorization = currentToken
    updateSessionToken(currentToken)
    updateSessionUser(currentUser)
    void reloadCurrentUser(currentUser).then()
  }
}