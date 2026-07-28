import { FaStar } from 'react-icons/fa'

import styles from './StarRating.module.css'

interface StarRatingProps {
    score: number
}

const GENERAL_STAR_NUMBER = 5

export default function StarRating({ score }: StarRatingProps) {
    const filledStarsNumber = Math.round(
        Math.min(Math.max(score, 0), GENERAL_STAR_NUMBER)
    )

    return (
        <div
            className={styles.star_container}
            aria-label={`Rating: ${score} out of ${GENERAL_STAR_NUMBER}`}
        >
            {Array.from({ length: GENERAL_STAR_NUMBER }, (_, index) => (
                <FaStar
                    key={index}
                    className={
                        index < filledStarsNumber
                            ? styles.filled_star
                            : styles.empty_star
                    }
                    aria-hidden="true"
                />
            ))}
        </div>
    )
}
