'use client'

import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

import Loader from '@/components/Loader/Loader'
import { getCamperFilters, getCampers } from '@/lib/campers-api'

import layoutStyles from '@/app/layout.module.css'
import styles from './Page.module.css'
import BookingForm from '@/components/Form/Form'
import CamperList from '@/components/CamperList/CamperList'
import { CampersResponse, GetCampersParams } from '@/types/camper'
import Button from '@/components/Button/Button'
import { useState } from 'react'

export default function CatalogPage() {
  const [filters, setFilters] = useState<GetCampersParams>({});

    // isFetchin, isFetching, isFetchingNextPage, isError, isLoading
    const campersQuery = useInfiniteQuery({
        queryKey: ['campers', { page: 1, perPage: 4 }, filters],
        queryFn: ({ pageParam }) => {
            return getCampers({
              ...filters,
              page: pageParam,
              perPage: 4
            })
        },
        initialPageParam: 1,
        getNextPageParam: (lastResponse: CampersResponse) => {
            const nextPage = lastResponse.page + 1
            return nextPage < lastResponse.totalPages ? nextPage : undefined
        },
        select: (data) => {
            return {
                ...data,
                campers: data.pages.flatMap((page) => page.campers),
            }
        },
    })

    const campers = campersQuery.data?.campers ?? [];
    const hasCampers = campers.length > 0;

    //data, error, isLoading, isError, isSuccess
    const filtersQuery = useQuery({
        queryKey: ['camper-filters'],
        queryFn: getCamperFilters,
    })

    const handleSubmit = async (formData: FormData) => {
      const requestData = Object.fromEntries(formData.entries());
      console.log(requestData);
      setFilters(requestData);
    }

    return (
        <main className={layoutStyles.catalog_main}>
            <section className={styles.catalogSection}>
                <div
                    className={`${layoutStyles.container} ${styles.catalogLayout}`}
                >
                    <aside className={styles.catalogFilters}>
                        {filtersQuery.isLoading && <Loader />}

                        {filtersQuery.data && (
                            <BookingForm
                                filters={filtersQuery.data}
                                onSubmit={handleSubmit}
                            />
                        )}
                    </aside>

                    <div className={styles.catalogContent}>
                        {campersQuery.isLoading && <Loader />}
                        {hasCampers && (
                            <CamperList campers={campers} />
                        )}
                        <Button className={styles.load_more_button} onClick={() => campersQuery.fetchNextPage()}>Load more</Button>
                    </div>
                </div>
            </section>
        </main>
    )
}
