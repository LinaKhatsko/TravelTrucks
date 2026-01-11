"use client";

import { useCamperStore } from "../../store/campers";
import { CamperForm } from "../../types/types";
import s from "./Filters.module.css";

export const Filters = () => {
  const { filters, setFilters, fetchCampers } = useCamperStore();

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ location: e.target.value });
  };

  const handleFeatureChange = (feature: string) => {
    const updatedFeatures = {
      ...filters.features,
      [feature]: !filters.features[feature as keyof typeof filters.features],
    };
    setFilters({ features: updatedFeatures });
  };

  const handleTypeChange = (type: string) => {
    setFilters({ form: type as CamperForm });
  };

  const handleSearch = () => {
    fetchCampers(true); // Скидаємо на 1 сторінку і вантажимо нові дані
  };

  return (
    <aside className={s.sidebar}>
      {/* Location */}
      <div className={s.filterGroup}>
        <label className={s.label}>Location</label>
        <div className={s.inputWrapper}>
          <svg className={s.iconMap} width="20" height="20">
            <use href="/icons.svg#icon-map" />
          </svg>
          <input
            type="text"
            className={s.locationInput}
            placeholder="City, Country"
            value={filters.location}
            onChange={handleLocationChange}
          />
        </div>
      </div>

      <p className={s.filtersTitle}>Filters</p>

      {/* Vehicle Equipment (Checkboxes) */}
      <div className={s.filterSection}>
        <h3 className={s.sectionTitle}>Vehicle equipment</h3>
        <div className={s.divider} />
        <div className={s.optionsGrid}>
          {[
            { id: "AC", label: "AC", icon: "ac" },
            { id: "transmission", label: "Automatic", icon: "transmission" },
            { id: "kitchen", label: "Kitchen", icon: "kitchen" },
            { id: "TV", label: "TV", icon: "tv" },
            { id: "bathroom", label: "Bathroom", icon: "bathroom" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              className={`${s.filterCard} ${
                (item.id === "transmission" ? filters.transmission === "automatic" : filters.features[item.id as keyof typeof filters.features])
                  ? s.active
                  : ""
              }`}
              onClick={() => {
                if (item.id === "transmission") {
                  setFilters({ transmission: filters.transmission === "automatic" ? "" : "automatic" });
                } else {
                  handleFeatureChange(item.id);
                }
              }}
            >
              <svg width="32" height="32">
                <use href={`/icons.svg#icon-${item.icon}`} />
              </svg>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Vehicle Type (Radio) */}
      <div className={s.filterSection}>
        <h3 className={s.sectionTitle}>Vehicle type</h3>
        <div className={s.divider} />
        <div className={s.optionsGrid}>
          {[
            { id: "panelTruck", label: "Van", icon: "van" },
            { id: "fullyIntegrated", label: "Fully Integrated", icon: "fully" },
            { id: "alcove", label: "Alcove", icon: "alcove" },
          ].map((type) => (
            <button
              key={type.id}
              type="button"
              className={`${s.filterCard} ${filters.form === type.id ? s.active : ""}`}
              onClick={() => handleTypeChange(type.id)}
            >
              <svg width="32" height="32">
                <use href={`/icons.svg#icon-${type.icon}`} />
              </svg>
              <span>{type.label}</span>
            </button>
          ))}
        </div>
      </div>

      <button className={s.searchBtn} onClick={handleSearch}>
        Search
      </button>
    </aside>
  );
};