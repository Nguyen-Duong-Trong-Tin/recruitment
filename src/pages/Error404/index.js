import { useNavigate } from "react-router-dom";
import "./Error404.scss";
import { Button } from "antd";

function Error404() {
  const navigate = useNavigate();
  
  return (
    <>
      <div className="error404">
        <h1>404</h1>
        <h2>Oops! This Page Could Not Be Found</h2>
        <p>SORRY BUT THE PAGE YOU ARE LOOKING FOR DOES NOT EXIST, HAVE BEEN REMOVED. NAME CHANGED OR IS TEMPORARILY UNAVAILABLE</p>
        <Button type="primary" className="button button--submit" onClick={() => navigate(-1)}>Go back</Button>
      </div>
    </>
  )
}

export default Error404;