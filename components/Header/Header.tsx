'use client';

import Link from "next/link";
import styles from "./Header.module.css";
import layoutStyles from "@/app/layout.module.css";

import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const isHomePage = pathname === "/";
  const isCatalogPage = pathname.startsWith("/catalog");

  return (
    <header className={
            `${styles.header}
            ${isHomePage ? styles.home_header : ""}
            ${isCatalogPage ? styles.catalog_header : ""}`
      }
    >
        <div className={layoutStyles.container}>
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
        </div>
    </header>
  );
}