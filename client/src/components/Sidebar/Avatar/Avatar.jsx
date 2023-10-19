import styles from "./Avatar.module.css";

// "Avatar" bileşeni, bir avatar görüntülemek için kullanılır.

// eslint-disable-next-line react/prop-types
export default function Avatar({ src }) {
  return (
    // Bileşen içindeki stil sınıfı, dış CSS modülünden alınır.
    <div className={styles.avatar}>
      {/* "src" prop'su, görüntülemek istediğimiz resmin URL'sini içerir. */}
      <img src={src} alt="Avatar" />
    </div>
  );
}
