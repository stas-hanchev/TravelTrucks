"use client";

import { useEffect, useState } from "react";

import Loader from "@/components/Loader/Loader";
import { getCampers } from "@/lib/campers-api";
import type { Camper } from "@/types/camper";

export default function CatalogPage() {
  const [campers, setCampers] = useState<Camper[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadCampers() {
      try {
        setIsLoading(true);

        const data = await getCampers({
          page: 1,
          perPage: 4,
        });

        setCampers(data.campers);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    void loadCampers();
  }, []);

  return (
    <main>
      {isLoading && <Loader />}

      <ul>
        {campers.map((camper) => (
          <li key={camper.id}>{camper.name}</li>
        ))}
      </ul>
    </main>
  );
}