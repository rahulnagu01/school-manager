import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.logo}>
        School Manager
      </Link>
      <div className={styles.links}>
        <Link href="/addSchool">Add School</Link>
        <Link href="/showSchools">View Schools</Link>
      </div>
    </nav>
  );
}
