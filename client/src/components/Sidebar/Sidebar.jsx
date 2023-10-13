import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { BookPlus, LayoutDashboard, FileSearch } from "lucide-react";
import Image from "../../assets/images/survey_app_image.jpg";
import Avatar from "./Avatar/Avatar";
import styles from "./Sidebar.module.css";
/*
styles ifadesi ile css stil tanımlarının ilişkilendirilmesini kolaylaştırır ve stil sınıflarının
izole olarak kullanılmasını sağlar yani stil isim çakışmalarını ve kaygıları ortadan kaldırır. 
*/
export default function Sidebar() {
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 720;
  /*
sayfa genişliğini izleyen bir React işlev bileşeni oluşturur. Sayfa genişliği değiştiğinde, yeni genişlik değeri kaydedilir ve 
bileşenin yeniden render edilmesi sağlanır. Aynı zamanda bileşen kaldırıldığında veya etkisi değiştirildiğinde olay dinleyicisi kaldırılır.
*/
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
          <Avatar src={Image}></Avatar>
          <p>Welcome!</p>
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
                {width > breakpoint && <span>Dashboard</span>}
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
