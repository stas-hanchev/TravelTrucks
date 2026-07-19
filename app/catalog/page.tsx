"use client";

import { useQuery } from "@tanstack/react-query";

import Loader from "@/components/Loader/Loader";
import { getCamperFilters, getCampers } from "@/lib/campers-api";

import layoutStyles from "@/app/layout.module.css";
import styles from "./Page.module.css";
import BookingForm from "@/components/Form/Form";

export default function CatalogPage() {
    //data, error, isLoading, isError, isSuccess
  const campersQuery = useQuery({
    queryKey: ["campers", { page: 1, perPage: 4 }],
    queryFn: () => getCampers({ page: 1, perPage: 4 }),
  });

  const filtersQuery = useQuery({
    queryKey: ["camper-filters"],
    queryFn: getCamperFilters,
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
  };

  return (
    <main className={layoutStyles.catalog_main}>
      <section className={styles.catalogSection}>
        <div
          className={`${layoutStyles.container} ${styles.catalogLayout}`}
        >
          <aside className={styles.catalogFilters}>
            {filtersQuery.isLoading && <Loader />}

            {filtersQuery.data && (
              <BookingForm filters={filtersQuery.data} onSubmit={handleSubmit} />
            )}
          </aside>

          <div className={styles.catalogContent}>
            {campersQuery.isLoading && <Loader />}

            <ul>
              {campersQuery.data?.campers.map((camper) => (
                <li key={camper.id}>{camper.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}