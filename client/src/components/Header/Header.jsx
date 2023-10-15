import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <header className={styles.header}>
      <nav className={styles.navUl}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            Survey Application - Akinsoft Software Challenge
          </li>
          <Link>
            {currentUser ? (
              <h2>Welcome</h2>
            ) : (
              <li className=" text-slate-700 hover:underline"> Sign in</li>
            )}
          </Link>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
