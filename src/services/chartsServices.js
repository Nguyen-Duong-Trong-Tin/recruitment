import { get, patch, post } from "../utils/request";

export const getChartByIDCompany = async (idCompany) => {
  const result = await get(`charts?idCompany=${idCompany}`);
  return result;
}

export const editChart = async (id, options) => {
  const result = await patch("charts/", id, options);
  return result;
}

export const createChart = async (options) => {
  const result = await post("charts/", options);
  return result;
}