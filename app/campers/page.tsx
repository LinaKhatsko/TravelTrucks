import { Filters } from "../../components/Filters/Filters";
import { CamperList } from "../../components/CamperList/CamperList";
import css from "./page.module.css";

export default function Catalog() {
    return (
        <>
            <main className={css.main}>
                <div className={`container ${css.container}`}>
                    <aside className={css.filtersWrapper}>
                        <Filters />
                    </aside>
                    <section className={css.content}>
                        <div className={css.listWrapper}>
                            <CamperList />
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}