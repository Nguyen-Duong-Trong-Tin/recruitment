export const getTimeNow = () => {
  const d = new Date();

  const result = `${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
  return result;
}

export const getMonthNow = () => {
  const d = new Date();
  return (d.getMonth() + 1) + "";
}

export const getYearNow = () => {
  const d = new Date();
  return d.getFullYear() + "";
}