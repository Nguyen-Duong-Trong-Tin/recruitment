export const getTimeNow = () => {
  const d = new Date();

  const result = `${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;

  return result;
}