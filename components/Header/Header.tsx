import { Logo } from './Logo';
import Link from "next/link";
import css from "./Header.module.css";

const Header = () => {
    return (
        <header className={css.header}>
            <div className={css.container}>
            <Logo />
            <nav aria-label="Main Navigation">
                <ul className={css.navigation}>
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/campers">Catalog</Link>
                    </li>
                </ul>
                </nav>
                </div>
        </header>
    );
};

export default Header;