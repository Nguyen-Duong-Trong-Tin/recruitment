import { useNavigate } from "react-router-dom";
import { deleteAllCookies } from "../../helpers/cookies";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../actions/login";

function Logout() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  deleteAllCookies();

  dispatch(checkLogin(false));

  navigate("/login");

  return (
    <>
      Logout
    </>
  )
}

export default Logout;