import { getCookie } from "../helpers/cookies";

const token = getCookie("token");
const init = token !== "";

const loginReducer = (state = init, action) => {
  const { type, status } = action;
  if (type === "CHECK_LOGIN") {
    return status;
  } else {
    return state;
  }
}

export default loginReducer;