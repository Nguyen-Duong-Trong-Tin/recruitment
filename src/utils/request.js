const DOMAIN = "http://localhost:3002/";

export const get = async (PATH) => {
  const response = await fetch(`${DOMAIN}${PATH}`);
  const result = await response.json();
  return result;
}

export const post = async (PATH, options) => {
  const response = await fetch(`${DOMAIN}${PATH}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(options)
  });
  const result = await response.json();
  return result;
}

export const patch = async (PATH, id, options) => {
  const response = await fetch(`${DOMAIN}${PATH}${id}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(options)
  });
  const result = await response.json();
  return result;
}

export const del = async (PATH, id) => {
  const response = await fetch(`${DOMAIN}${PATH}${id}`, {
    method: "DELETE",
  });
  const result = await response.json();
  return result;
};