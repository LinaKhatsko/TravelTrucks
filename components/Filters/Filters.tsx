"use client";

import { ChangeEvent } from "react";
import { useCamperStore } from "../../store/campers";
import { CamperForm } from "../../types/types";
import css from "./Filters.module.css";

export const Filters = () => {
  const { filters, setFilters, fetchCampers } = useCamperStore();

  /* ===== handlers ===== */

  const handleLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilters({ location: e.target.value });
  };

  const handleFeatureToggle = (feature: keyof typeof filters.features) => {
    setFilters({
      features: {
        ...filters.features,
        [feature]: !filters.features[feature],
      },
    });
  };

  const handleTransmissionToggle = () => {
    setFilters({
      transmission:
        filters.transmission === "automatic" ? "" : "automatic",
    });
  };

  const handleTypeChange = (type: CamperForm) => {
    setFilters({ form: type });
  };

  const handleSearch = () => {
    fetchCampers(true); // reset page + fetch with new filters
  };

  /* ===== render ===== */

  return (
    <aside className={css.sidebar}>
      {/* ===== Location ===== */}
      <div className={css.filterGroup}>
        <label className={css.label}>Location</label>

        <div className={css.inputWrapper}>
          <svg className={css.iconMap} width="20" height="20">
            <use href="/icon/sprite.svg#map" />
          </svg>

          <input
            type="text"
            className={css.locationInput}
            placeholder="City, Country"
            value={filters.location}
            onChange={handleLocationChange}
          />
        </div>
      </div>

      <div className={css.filtersWrap}>
      <p className={css.filtersTitle}>Filters</p>

      {/* ===== Vehicle equipment ===== */}
      <div className={css.filterSection}>
        <h3 className={css.sectionTitle}>Vehicle equipment</h3>
        <hr className={css.line} />
        <div className={css.divider} />

        <div className={css.optionsGrid}>
          {[
            { id: "AC", label: "AC", icon: "ac" },
            { id: "transmission", label: "Automatic", icon: "transmission" },
            { id: "cup-hot", label: "Kitchen", icon: "kitchen" },
            { id: "tv", label: "TV", icon: "tv" },
            { id: "bathroom", label: "Bathroom", icon: "bathroom" },
          ].map((item) => {
            const isActive =
              item.id === "transmission"
                ? filters.transmission === "automatic"
                : filters.features[item.id as keyof typeof filters.features];

            return (
              <button
                key={item.id}
                type="button"
                className={`${css.filterCard} ${isActive ? css.active : ""}`}
                onClick={() => {
                  if (item.id === "transmission") {
                    handleTransmissionToggle();
                  } else {
                    handleFeatureToggle(
                      item.id as keyof typeof filters.features
                    );
                  }
                }}
              >
                <svg width="32" height="32">
                  <use
                    href={`/icon/sprite.svg#icon-${item.icon}`}
                  />
                </svg>

                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ===== Vehicle type ===== */}
      <div className={css.filterSection}>
        <h3 className={css.sectionTitle}>Vehicle type</h3>
        <hr className={css.line} />
        <div className={css.divider} />

        <div className={css.optionsGrid}>
          {[
            { id: "panelTruck", label: "Van", icon: "van" },
            {
              id: "fullyIntegrated",
              label: "Fully Integrated",
              icon: "fully",
            },
            { id: "alcove", label: "Alcove", icon: "alcove" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              className={`${css.filterCard} ${
                filters.form === item.id ? css.active : ""
              }`}
              onClick={() => handleTypeChange(item.id as CamperForm)}
            >
              <svg width="32" height="32">
                <use
                  href={`/icon/sprite.svg#icon-${item.icon}`}
                />
              </svg>

              <span>{item.label}</span>
            </button>
          ))}
          </div>
          </div>
      </div>

      {/* ===== Search ===== */}
      <button className={css.searchBtn} onClick={handleSearch}>
        Search
      </button>
    </aside>
  );
};