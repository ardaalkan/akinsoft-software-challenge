import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { BookPlus, LayoutDashboard, FileSearch } from "lucide-react";
import Image from "../../assets/images/survey_app_image.jpg";
import Avatar from "./Avatar/Avatar";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 720;

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
          </ul>
        </nav>
      </div>
    </div>
  );
}
