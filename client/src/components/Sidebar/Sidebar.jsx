import { useState, useEffect } from "react";
import Avatar from "./Avatar/Avatar";
import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  const [width, setWidth] = useState(window.innerWidth);
  const mobileBreakpoint = 720;

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
    return () =>
      window.removeEventListener("resize", () => setWidth(window.innerWidth));
  }, []);

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarContent}>
        <div className={styles.user}>
          <Avatar></Avatar>
          <p>hey</p>
        </div>
        <nav className={styles.links}>
          <ul>
            <li>
              <NavLink to="/" className={styles.link}>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/create" className={styles.link}>
                Create
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
