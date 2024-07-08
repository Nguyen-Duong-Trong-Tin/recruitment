const loginReducer = (state = false, action) => {
  const { type, status } = action;
  if (type === "CHECK_LOGIN") {
    return status;
  }
  else {
    return state;
  }
}

export default loginReducer;