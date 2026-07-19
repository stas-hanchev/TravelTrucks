import Image from 'next/image'
import { FaStar } from 'react-icons/fa'

import { Camper } from '@/types/camper'
import { makeSpaceSeparated, makeFisrtUpperCase } from '@/lib/labelUtils';

import styles from './CamperCard.module.css'
import Button from '../Button/Button';

export default function CamperCard({ camper }: { camper: Camper }) {
    return (
        <div className={styles.camper_card}>
            <Image
                src={camper.coverImage}
                alt={camper.name}
                className={styles.camper_image}
                width={219}
                height={240}
            ></Image>
            <div className={styles.card_content}>
                <div className={styles.card_title}>
                    <h2 className={styles.camper_name}>{camper.name}</h2>
                    <p className={styles.camper_price}>€{camper.price}</p>
                </div>
                <div className={styles.subtitle}>
                    <div className={styles.rating}>
                        <FaStar className={styles.star} aria-hidden="true" />
                        <p>
                            {camper.rating} ({camper.totalReviews} Reviews)
                        </p>
                    </div>
                    <div className={styles.location}>
                        <svg
                            width="16"
                            height="16"
                            className={styles.location_icon}
                        >
                            <use href="/icon-sprite.svg#icon-icon-map"></use>
                        </svg>
                        <p>{camper.location}</p>
                    </div>
                </div>
                <p className={styles.description}>{camper.description}</p>
                <div className={styles.camper_characteristics}>
                    <div
                        className={`${styles.engine_char}, ${styles.char_container}`}
                    >
                        <svg
                            width="20"
                            height="20"
                            className={styles.char_icon}
                        >
                            <use href="/icon-sprite.svg#icon-icon-petrol"></use>
                        </svg>
                        <p>{makeFisrtUpperCase(makeSpaceSeparated(camper.engine))}</p>
                    </div>
                    <div
                        className={`${styles.transmission_char}, ${styles.char_container}`}
                    >
                        <svg
                            width="20"
                            height="20"
                            className={styles.char_icon}
                        >
                            <use href="/icon-sprite.svg#icon-icon-hierarchy"></use>
                        </svg>
                        <p>{makeFisrtUpperCase(makeSpaceSeparated(camper.transmission))}</p>
                    </div>
                    <div
                        className={`$styles.form_char}, ${styles.char_container}`}
                    >
                        <svg
                            width="20"
                            height="20"
                            className={styles.char_icon}
                        >
                            <use href="/icon-sprite.svg#icon-icon-car"></use>
                        </svg>
                        <p>{makeFisrtUpperCase(makeSpaceSeparated(camper.form))}</p>
                    </div>
                </div>
                <Button className={styles.card_button}>Show more</Button>
            </div>
        </div>
    )
}
