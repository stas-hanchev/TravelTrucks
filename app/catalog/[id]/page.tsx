import Image from 'next/image'
import { FaStar } from 'react-icons/fa'

import { getCamperById } from '@/lib/campers-api'
import { makeSpaceSeparated, makeFisrtUpperCase } from "@/lib/labelUtils";

import styles from './Page.module.css'
import layoutStyles from '@/app/layout.module.css'

interface CamperPageProps {
    params: Promise<{ id: string }>
}

export default async function CamperPage({ params }: CamperPageProps) {
    const { id } = await params;

    const camper = await getCamperById(id)

    return (
        <main className={layoutStyles.camper_main}>
            <section className={styles.camper_section}>
                <div
                    className={`${layoutStyles.container} ${styles.camper_info_container}`}
                >
                    <div className={styles.gallery}>
                        <div className={styles.main_picture_container}>
                            <Image
                                className={styles.main_picture}
                                width={638}
                                height={505}
                                src={camper.gallery[0].thumb}
                                alt="Main camper image"
                            ></Image>
                        </div>
                        <div className={styles.remaining_pictures_container}>
                            {camper.gallery.map((element) => {
                                return (
                                    <Image
                                        key={element.id}
                                        className={styles.remaining_images}
                                        src={element.thumb}
                                        width={136}
                                        height={144}
                                        alt="Camper image"
                                    ></Image>
                                )
                            })}
                        </div>
                    </div>

                    <div className={styles.camper_info}>
                        <div className={styles.camper_desc_container}>
                            <h2 className={styles.camper_name}>
                                {camper.name}
                            </h2>
                            <div className={styles.reviews_and_location}>
                                <FaStar
                                    className={styles.star}
                                    aria-hidden="true"
                                />
                                <p className={styles.rating}>
                                    {camper.rating} ({camper.totalReviews}{' '}
                                    Reviews)
                                </p>
                                <svg
                                    width="16"
                                    height="16"
                                    className={styles.location_icon}
                                >
                                    <use href="/icon-sprite.svg#icon-icon-map"></use>
                                </svg>
                                <p className={styles.location}>{camper.location}</p>
                            </div>
                            <p className={styles.price}>€{camper.price}</p>
                            <p className={styles.description}>{camper.description}</p>
                        </div>
                        <div className={styles.camper_details_container}>
                            <h2 className={styles.vehicle_details_heading}>Vehicle details</h2>
                            <div className={styles.characteristics_container}>
                                <div className={styles.characteristic_container}>{makeFisrtUpperCase(makeSpaceSeparated(camper.transmission))}</div>
                                {camper.amenities.map((element, indx) => {
                                    return (<div key={indx} className={styles.characteristic_container}><p>{makeFisrtUpperCase(makeSpaceSeparated(element))}</p></div>)
                                })}
                                <div className={styles.characteristic_container}>{makeFisrtUpperCase(makeSpaceSeparated(camper.form))}</div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.reviews}></div>

                    <div className={styles.booking_form}></div>
                </div>
            </section>
        </main>
    )
}
