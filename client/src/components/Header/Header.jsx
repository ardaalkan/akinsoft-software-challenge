// src/Header.js
import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            Survey Application - Akinsoft Software Challenge
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
