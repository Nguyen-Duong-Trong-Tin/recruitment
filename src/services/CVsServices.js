import { del, get, patch, post } from "../utils/request"

export const getCVByID = async (id) => {
  const result = await get(`cvs/${id}`);
  return result;
}

export const getCVsByIDCompany = async (idCompany) => {
  const result = await get(`cvs?idCompany=${idCompany}`);
  return result;
}

export const editCV = async (id, options) => {
  const result = await patch("cvs/", id, options);
  return result;
}

export const createCV = async (options) => {
  const result = await post("cvs", options);
  return result;
}

export const deleteCV = async (id) => {
  const result = await del("cvs/", id);
  return result;
}