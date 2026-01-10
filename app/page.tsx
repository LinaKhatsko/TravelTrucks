import HomeHero from "../components/HomeHero/HomeHero";
import css from "./Home.module.css";

export default function HomePage() {
    return (
        <main className={css.main}>
                <HomeHero />
        </main>
    );
}