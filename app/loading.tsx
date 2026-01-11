import css from "./loading.module.css";

export default function Loading() {
    return (
        <div className={css.container}>
            <div className={css.loader}></div>
        </div>
    );
}