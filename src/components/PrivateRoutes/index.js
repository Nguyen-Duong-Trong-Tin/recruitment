import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "../../helpers/cookies";

function PrivateRoutes() {
  const token = getCookie("token");

  return (
    <>
      {token ? (<Outlet />) : (<Navigate to="/login" />)}
    </>
  )
}

export default PrivateRoutes;