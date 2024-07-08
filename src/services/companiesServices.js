import { get, patch, post } from "../utils/request"

export const getCompanies = async (idCompany="") => {
  const result = await get(`companies/${idCompany}`);
  return result;
}

export const getCompany = async (email, password) => {
  const result = await get(
    "companies?"
    + (email ? `email=${email}` : "")
    + (password ? `&password=${password}` : "")
  );
  return result;
}

export const createCompany = async (options) => {
  const result = await post("companies", options);
  return result; 
}

export const editCompany = async (id, options) => {
  const result = await patch("companies/", id, options);
  return result;
}