import { del, get, patch, post } from "../utils/request"

export const getJobs = async (params="") => {
  const result = await get(`jobs/${params}`);
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