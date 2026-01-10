import { Logo } from './Logo';
import Link from "next/link";
import css from "./Header.module.css";

const Header = () => {
    return (
        <header className={`container ${css.header}`}>
            <Logo className={css.logo}/>
            <nav aria-label="Main Navigation">
                <ul className={css.navigation}>
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/notes">Catalog</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;