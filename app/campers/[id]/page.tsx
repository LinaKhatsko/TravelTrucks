'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { Camper } from '@/types/types';
import css from './page.module.css';

// Можна також додати Suspense для завантаження
export default function CamperDetailsPage() {
  const { id } = useParams();
  const [camper, setCamper] = useState<Camper | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCamperById = async () => {
      try {
        const response = await axios.get(`https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers/${id}`);
        setCamper(response.data);
      } catch (error) {
        console.error("Failed to fetch camper details", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchCamperById();
  }, [id]);

  if (isLoading) return <div className="container">Loading...</div>;
  if (!camper) return <div className="container">Camper not found</div>;

  return (
    <main className={css.main}>
      <div className={`container ${css.container}`}>
        {/* Заголовок та Рейтинг */}
        <section className={css.header}>
          <h1 className={css.title}>{camper.name}</h1>
          <div className={css.meta}>
            <span className={css.rating}>★ {camper.rating}({camper.reviews.length} Reviews)</span>
            <span className={css.location}>{camper.location}</span>
          </div>
          <p className={css.price}>€{camper.price.toFixed(2)}</p>
        </section>

        {/* Галерея (тут вже показуємо всі фото) */}
        <section className={css.gallery}>
          {camper.gallery.map((img, index) => (
            <div key={index} className={css.imageWrapper}>
              <Image 
                src={img.original} 
                alt={`${camper.name} view ${index + 1}`}
                sizes="(max-width: 768px) 100vw, 290px"
                      className={css.image}
                      width={292}
                      height={320}
                priority={index === 0} // Завантажуємо перше фото швидше для LCP
              />
            </div>
          ))}
        </section>

        {/* Опис */}
        <p className={css.description}>{camper.description}</p>

        {/* Тут будуть таби: Features та Reviews */}
        <div className={css.tabsWrapper}>
           {/* Сюди згодом додамо логіку перемикання табів */}
           <p>Детальна інформація та відгуки будуть тут...</p>
        </div>
      </div>
    </main>
  );
}