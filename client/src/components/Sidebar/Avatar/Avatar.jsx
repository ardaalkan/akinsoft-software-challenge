import styles from "./Avatar.module.css";

// eslint-disable-next-line react/prop-types
export default function Avatar({ src }) {
  return (
    <div className={styles.avatar}>
      <img src={src}></img>
    </div>
  );
}
