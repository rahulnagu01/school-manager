import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to School Manager</h1>
        <div className={styles.buttons}>
          <Link href="/addSchool" className={styles.primaryBtn}>
            Add School
          </Link>
          <Link href="/showSchools" className={styles.secondaryBtn}>
            View Schools
          </Link>
        </div>
      </main>
    </div>
  );
}
