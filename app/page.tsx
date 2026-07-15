"use client";

import layoutStyles from "@/app/layout.module.css";
import styles from "./page.module.css";
import buttonStyles from "@/components/Button/Button.module.css";
import Button from "@/components/Button/Button";

export default function Home() {
  return (
    <section className={styles.hero_section}>
      <div className={layoutStyles.container}>
        <div className={styles.hero_content}>
          <h1 className={styles.hero_title}>Campers of your dreams</h1>
          <p className={styles.hero_description}>You can find everything you want in our catalog</p>
          <Button className={buttonStyles.hero_button} onClick={() => console.log("Hero button clicked!")}>View Now</Button>
        </div>
      </div>
    </section>
  );
}
