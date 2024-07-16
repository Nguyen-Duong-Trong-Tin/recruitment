import { del, get, patch, post } from "../utils/request"

export const getJobs = async () => {
  const result = await get("jobs");
  return result;
}

export const getJobsByParams = async (params) => {
  const result = await get(`jobs/${params}`);
  return result;
}

export const getJobByID = async (id) => {
  const result = await get(`jobs/${id}`);
  return result;
}

export const getJobsByIDCompany = async (idCompany) => {
  const result = await get(`jobs?idCompany=${idCompany}`);
  return result;
}

export const createJob = async (options) => {
  const result = await post("jobs/", options);
  return result;
}

export const editJob = async (id, options) => {
  const result = await patch("jobs/", id, options);
  return result;
}

export const deleteJob = async (id) => {
  const result = await del("jobs/", id);
  return result;
}