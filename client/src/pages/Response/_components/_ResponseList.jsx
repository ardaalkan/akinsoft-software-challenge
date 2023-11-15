import ResponseCategory from './_ResponseCategory';
import styles from "../Response.module.css";

export default function ResponseList({ userListings }) {
  return (
    <div className={styles.scrollContainer}>
      {userListings.map((category) => (
        <ResponseCategory key={category._id} category={category} />
      ))}
    </div>
  );
}