// src/Header.js
import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <h1>Benim Basit Header</h1>
      <nav>
        <ul className={styles.navList}>
          <li className={styles.navItem}>Anasayfa</li>
          <li className={styles.navItem}>Hakkında</li>
          <li className={styles.navItem}>Hizmetler</li>
          <li className={styles.navItem}>İletişim</li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
