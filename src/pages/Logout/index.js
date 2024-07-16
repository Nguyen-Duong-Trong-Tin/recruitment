import { useNavigate } from "react-router-dom";
import { deleteAllCookies } from "../../helpers/cookies";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../actions/login";
import { useEffect } from "react";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  deleteAllCookies();

  useEffect(() => {
    dispatch(checkLogin(false));
    navigate("/login");
  }, []);

  return (
    <>
      Logout
    </>
  )
}

export default Logout;