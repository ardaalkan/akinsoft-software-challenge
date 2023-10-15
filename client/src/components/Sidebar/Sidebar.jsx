import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { BookPlus, LayoutDashboard, FileSearch, LogOut } from "lucide-react";
import Image from "../../assets/images/survey_app_image.jpg";
import Avatar from "./Avatar/Avatar";
import styles from "./Sidebar.module.css";
import { useDispatch } from "react-redux";
import {
  signOutStart,
  signOutSuccess,
  signOutFailure,
} from "../../redux/user/userSlice";

export default function Sidebar() {
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 720;
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      dispatch(signOutStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutFailure(data.message));
        return;
      }
      dispatch(signOutSuccess(data));
    } catch (error) {
      // eslint-disable-next-line no-undef
      dispatch(signOutFailure(data.message));
    }
  };

  const classNameFunc = ({ isActive }) => (isActive ? styles.activeLink : "");

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarContent}>
        <div className={styles.user}>
          <Avatar src={Image}></Avatar>
          <p className={styles.userText}>Welcome!</p>
        </div>
        <nav className={styles.links}>
          <ul>
            <li>
              <NavLink
                to="/"
                style={{ textDecoration: "none" }}
                className={classNameFunc}
              >
                <LayoutDashboard style={{ marginRight: "25px" }} />
                {width > breakpoint && <span>Main</span>}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/all"
                style={{ textDecoration: "none" }}
                className={classNameFunc}
              >
                <FileSearch style={{ marginRight: "25px" }} />
                {width > breakpoint && <span>All Survey</span>}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/add"
                style={{ textDecoration: "none" }}
                className={classNameFunc}
              >
                <BookPlus style={{ marginRight: "25px" }} />
                {width > breakpoint && <span>Add New Survey</span>}
              </NavLink>
            </li>
            <li>
              <NavLink
                style={{ textDecoration: "none" }}
                className={classNameFunc}
                onClick={handleSignOut}
              >
                <LogOut style={{ marginRight: "25px" }} />
                {width > breakpoint && <span>Sign Out</span>}
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
