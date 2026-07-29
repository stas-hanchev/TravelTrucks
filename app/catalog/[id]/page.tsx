import { FaStar } from 'react-icons/fa'
import LiteralAvatar from '@/components/LiteralAvatar/LiteralAvatar'
import StarRating from '@/components/StarRating/StarRating'
import CamperGallery from '@/components/CamperGallery/CamperGallery'

import { getCamperById, getCamperReviews } from '@/lib/campers-api'
import { makeSpaceSeparated, makeFisrtUpperCase } from '@/lib/labelUtils'

import styles from './Page.module.css'
import layoutStyles from '@/app/layout.module.css'
import BookingForm from '@/components/BookingForm/BookingForm'

interface CamperPageProps {
    params: Promise<{ id: string }>
}

export default async function CamperPage({ params }: CamperPageProps) {
    const { id } = await params;

    const camper = await getCamperById(id);
    const reviews = await getCamperReviews(id);

    return (
        <main className={layoutStyles.camper_main}>
            <section className={styles.camper_section}>
                <div
                    className={`${layoutStyles.container} ${styles.camper_info_container}`}
                >
                    <div className={styles.upper_part}>
                        <div className={styles.gallery}>
                            <CamperGallery
                                images={camper.gallery}
                                camperName={camper.name}
                            ></CamperGallery>
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
                                    <p className={styles.location}>
                                        {camper.location}
                                    </p>
                                </div>
                                <p className={styles.price}>€{camper.price}</p>
                                <p className={styles.description}>
                                    {camper.description}
                                </p>
                            </div>
                            <div className={styles.camper_details_container}>
                                <h2 className={styles.vehicle_details_heading}>
                                    Vehicle details
                                </h2>
                                <div
                                    className={styles.characteristics_container}
                                >
                                    <div
                                        className={
                                            styles.characteristic_container
                                        }
                                    >
                                        {makeFisrtUpperCase(
                                            makeSpaceSeparated(
                                                camper.transmission
                                            )
                                        )}
                                    </div>
                                    {camper.amenities.map((element, indx) => {
                                        return (
                                            <div
                                                key={indx}
                                                className={
                                                    styles.characteristic_container
                                                }
                                            >
                                                {makeFisrtUpperCase(
                                                    makeSpaceSeparated(element)
                                                )}
                                            </div>
                                        )
                                    })}
                                    <div
                                        className={
                                            styles.characteristic_container
                                        }
                                    >
                                        {makeFisrtUpperCase(
                                            makeSpaceSeparated(camper.form)
                                        )}
                                    </div>
                                </div>
                                <ul className={styles.next_details_list}>
                                    <li
                                        className={styles.next_detail_container}
                                    >
                                        <p>Form</p>
                                        <p>
                                            {makeFisrtUpperCase(
                                                makeSpaceSeparated(camper.form)
                                            )}
                                        </p>
                                    </li>
                                    <li
                                        className={styles.next_detail_container}
                                    >
                                        <p>Length</p>
                                        <p>{camper.length}</p>
                                    </li>
                                    <li
                                        className={styles.next_detail_container}
                                    >
                                        <p>Width</p>
                                        <p>{camper.width}</p>
                                    </li>
                                    <li
                                        className={styles.next_detail_container}
                                    >
                                        <p>Height</p>
                                        <p>{camper.height}</p>
                                    </li>
                                    <li
                                        className={styles.next_detail_container}
                                    >
                                        <p>Tank</p>
                                        <p>{camper.tank}</p>
                                    </li>
                                    <li
                                        className={styles.next_detail_container}
                                    >
                                        <p>Consumption</p>
                                        <p>{camper.consumption}</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className={styles.lower_part}>
                        <div className={styles.reviews}>
                            <h2 className={styles.reviews_heading}>Reviews</h2>
                            {reviews.map((element) => {
                                return (
                                    <div
                                        key={element.id}
                                        className={styles.review_container}
                                    >
                                        <div
                                            className={
                                                styles.avatar_name_rating_container
                                            }
                                        >
                                            <LiteralAvatar
                                                name={element.reviewer_name}
                                            ></LiteralAvatar>
                                            <div
                                                className={
                                                    styles.name_and_rating_container
                                                }
                                            >
                                                <p
                                                    className={
                                                        styles.reviewer_name
                                                    }
                                                >
                                                    {element.reviewer_name}
                                                </p>
                                                <StarRating
                                                    score={
                                                        element.reviewer_rating
                                                    }
                                                ></StarRating>
                                            </div>
                                        </div>
                                        <p className={styles.comment}>
                                            {element.comment}
                                        </p>
                                    </div>
                                )
                            })}
                        </div>

                        <div className={styles.booking_form}>
                            <BookingForm camperId={id}></BookingForm>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
