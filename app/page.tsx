import Header from "../components/Header/Header";
import HomeHero from "../components/HomeHero/HomeHero";
import css from "./Home.module.css";

export default function HomePage() {
    return (
        <>
            <Header />
            <main className={css.main}>
                <HomeHero />
            </main>
        </>
    );
}