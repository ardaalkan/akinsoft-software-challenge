import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { BookPlus, LayoutDashboard, FileSearch } from "lucide-react";
import Avatar from "./Avatar/Avatar";
import styles from "./Sidebar.module.css";
/*
styles ifadesi ile css stil tanımlarının ilişkilendirilmesini kolaylaştırır ve stil sınıflarının
izole olarak kullanılmasını sağlar yani stil isim çakışmalarını ve kaygıları ortadan kaldırır. 
*/
export default function Sidebar() {
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 720;

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
    return () =>
      window.removeEventListener("resize", () => setWidth(window.innerWidth));
  }, []);

  // Bu işlev, etkin linkler için "active_link" sınıfını ekler
  const classNameFunc = ({ isActive }) => (isActive ? styles.activeLink : "");

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarContent}>
        <div className={styles.user}>
          <Avatar></Avatar>
          <p>Welcome</p>
        </div>
        <nav className={styles.links}>
          <ul>
            <li>
              <NavLink
                to="/"
                activeClassName={styles.activeLink}
                style={{ textDecoration: "none" }}
                className={classNameFunc}
              >
                <LayoutDashboard style={{ marginRight: "25px" }} />
                {width > breakpoint && <span>Dashboard</span>}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/all"
                activeClassName={styles.activeLink}
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
                activeClassName={styles.activeLink}
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
