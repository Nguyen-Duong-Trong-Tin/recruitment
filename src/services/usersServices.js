import { get, post } from "../utils/request";

export const getUser = async (email, password = "") => {
  const pPassword = password === "" ? "" : `password=${password}`;

  const result = await get(`users?email=${email}&${pPassword}`);
  return result;
}

export const createUser = async (options) => {
  const result = await post("users/", options);
  return result;
}