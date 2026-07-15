import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
        <div className={styles.header_container}>
            <div className={styles.header_logo}>
                <Link href="/">
                    <svg width="136" height="15" className={styles.header_logo}>
                        <use href="/icon-sprite.svg#icon-icon-logo"></use>
                    </svg>
                </Link>
            </div>
            <div className={styles.header_links}>
                <Link href="/">Home</Link>
                <Link href="/catalog">Catalog</Link>
            </div>
        </div>
    </header>
  );
}