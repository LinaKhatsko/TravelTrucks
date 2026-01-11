"use client";

import { useEffect } from "react";
import { useCamperStore } from "../../store/campers";
import { CamperCard } from "../CamperCard/CamperCard";
import css from "./CamperList.module.css";

export const CamperList = () => {
  // Дістаємо все необхідне зі стору. Не створюємо локальних useState для пагінації!
  const { items, isLoading, hasMore, fetchCampers } = useCamperStore();

  // 1. Завантажуємо першу порцію даних при монтуванні
  useEffect(() => {
    // Якщо список порожній (перший захід), вантажимо дані
    if (items.length === 0) {
      fetchCampers(true);
    }
  }, [fetchCampers, items.length]); // Пустий масив, бо за фільтри відповідає кнопка "Search" у Sidebar

  const handleLoadMore = () => {
    fetchCampers(false); // Просто вантажимо наступну сторінку
  };

  return (
    <div className={css.container}>
      <ul className={css.list}>
        {items.map((camper) => (
          <li key={camper.id}>
            <CamperCard camper={camper} />
          </li>
        ))}
      </ul>

      {isLoading && <p className={css.loading}>Loading...</p>}

      {!isLoading && hasMore && (
        <button className={css.loadMore} onClick={handleLoadMore}>
          Load more
        </button>
      )}
    </div>
  );
};
