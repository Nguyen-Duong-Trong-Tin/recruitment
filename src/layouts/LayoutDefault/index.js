import { Link, NavLink, Outlet } from "react-router-dom";
import "./LayoutDefault.scss";
import { useSelector } from 'react-redux';
import { getCookie } from "../../helpers/cookies";
import { BiLogInCircle } from "react-icons/bi";
import { PiTrademarkRegisteredThin } from "react-icons/pi";
import { MdOutlineManageAccounts } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";
import { Button } from "antd";

function LayoutDefault() {
  const isLogin = useSelector(state => state.loginReducer);
  const token = getCookie("token");

  return (
    <>
      <section className="layout-default">
        <header className="header">
          <div className="header__logo">
            <Link to="/">IT Jobs</Link>
          </div>
          <ul className="header__right">
            {token ? (
              <>
                <li className="header__admin">
                  <NavLink to="/admin">
                    <Button>
                      <MdOutlineManageAccounts />
                      Manage
                    </Button>
                  </NavLink>
                </li>
                <li className="header__admin">
                  <NavLink to="/logout">
                    <Button>
                      <RiLogoutCircleLine />
                      Logout
                    </Button>
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/login">
                    <Button>
                      <BiLogInCircle />
                      Login
                    </Button>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/register">
                    <Button>
                      <PiTrademarkRegisteredThin />
                      Register
                    </Button>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </header>
        <main className="main">
          <Outlet />
        </main>
        <footer className="footer">
          <ul className="footer__left">
            <li>Facebook</li>
            <li>Instargram</li>
          </ul>
          <ul className="footer__right">
            <li>We will help you get a good job</li>
            <li>We will help the companies find the good employees</li>
            <li></li>
          </ul>
        </footer>
      </section>
    </>
  )
}

export default LayoutDefault;