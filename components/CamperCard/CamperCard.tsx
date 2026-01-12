import Image from 'next/image';
import Link from 'next/link';
import { useFavoritesStore } from '../../store/favorites';
import { Camper } from '@/types/types';
import s from './CamperCard.module.css';

interface CamperCardProps {
  camper: Camper;
}

export const CamperCard = ({ camper }: CamperCardProps) => {

  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const isFav = isFavorite(camper.id);
  const formatPrice = (price: number) => {

    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
    }).format(price).replace('€', '€');
  };

  return (
    <div className={s.card}>
      {/* Фото кемпера */}
      <div className={s.imageWrapper}>
        <Image
          src={camper.gallery[0].thumb}
          alt={camper.name}
          className={s.image}
          width={290}
          height={310}
          priority
        />
      </div>

      <div className={s.info}>
        {/* Заголовок: Назва, Ціна та Сердечко */}
        <div className={s.header}>
          <h2 className={s.name}>{camper.name}</h2>
          <div className={s.priceWrapper}>
            <span className={s.price}>{formatPrice(camper.price)}</span>
            <button 
              type="button" 
              className={s.heartBtn}
              onClick={() => toggleFavorite(camper.id)}
              aria-label="Add to favorites"
            >
              <svg 
                width="24" 
                height="24" 
                className={isFav ? s.heartIconActive : s.heartIcon}
              >
                <use href="/sprite.svg#heart" />
              </svg>
            </button>
          </div>
        </div>

        {/* Рейтинг та Локація */}
        <div className={s.meta}>
          <div className={s.rating}>
            <svg width="16" height="16" className={s.starIcon}>
              <use href="/sprite.svg#star" />
            </svg>
            <span className={s.ratingText}>
              {camper.rating}({camper.reviews.length} Reviews)
            </span>
          </div>
          <div className={s.location}>
            <svg width="16" height="16" className={s.mapIcon}>
              <use href="/sprite.svg#map-16" />
            </svg>
            <span>{camper.location}</span>
          </div>
        </div>

        {/* Опис (обрізаний) */}
        <p className={s.description}>{camper.description}</p>

        {/* Фішки (Характеристики) */}
        <ul className={s.featuresList}>
          {camper.transmission === 'automatic' && (
            <li className={s.featureItem}>
              <svg width="20" height="20"><use href="/icons.svg#icon-transmission" /></svg>
              Automatic
            </li>
          )}
          <li className={s.featureItem}>
            <svg width="20" height="20"><use href="/sprite.svg#fuel-pump" /></svg>
            {camper.engine}
          </li>
          {camper.kitchen && (
            <li className={s.featureItem}>
              <svg width="20" height="20"><use href="/sprite.svg#icon-kitchen" /></svg>
              Kitchen
            </li>
          )}
          {camper.AC && (
            <li className={s.featureItem}>
              <svg width="20" height="20"><use href="/sprite.svg#icon-ac" /></svg>
              AC
            </li>
          )}
        </ul>

        {/* Кнопка переходу */}
        <Link href={`/campers/${camper.id}`} className={s.showMoreBtn}>
          Show more
        </Link>
      </div>
    </div>
  );
};