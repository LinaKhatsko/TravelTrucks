import { Filters } from "../../components/Filters/Filters";
import { CamperList } from "../../components/CamperList/CamperList";
import css from "./page.module.css";

export default function Catalog() {
    return (
        <>
            <main className={css.main}>
                <div className={`container ${css.container}`}>
                    <Filters />
                    <CamperList />
                </div>
            </main>
        </>
    );
}