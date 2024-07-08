export const countJobsOn = (jobs) => {
  return jobs.reduce((total, item) => total + item.status, 0);
}

export const countCvsRead = (cvs) => {
  return cvs.reduce((total, item) => total + item.statusRead, 0);
}