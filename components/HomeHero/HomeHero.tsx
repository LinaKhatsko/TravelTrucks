import Link from "next/link";
import styles from "./HomeHero.module.css";

const HomeHero = () => {
  return (
      <section className={styles.hero}>
          <div className={`container ${styles.heroContent}`}>
              <h1 className={styles.title}>Campers of your dreams</h1>
              <p className={styles.text}>
                  You can find everything you want in our catalog
              </p>
              <Link href="/campers" className={styles.button}>
                  View Now
              </Link>
          </div>
      </section>
  );
};

export default HomeHero;