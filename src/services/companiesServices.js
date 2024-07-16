import { get, patch, post } from "../utils/request"

export const getCompanies = async () => {
  const result = await get("companies");
  return result;
}

export const getCompanyByID = async (id) => {
  const result = await get (`companies/${id}`);
  return result;
}

export const login = async (email, password) => {
  const result = await get(`companies?email=${email}&password=${password}`);
  return result;
}

export const checkExistEmail = async (email) => {
  const result = await get(`companies?email=${email}`);
  return result;
}

export const register = async (options) => {
  const result = await post("companies", options);
  return result; 
}

export const editCompany = async (id, options) => {
  const result = await patch("companies/", id, options);
  return result;
}