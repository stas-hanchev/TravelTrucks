import Image from 'next/image'
import styles from './NoCampersFound.module.css';

export default function NoCampersFound () {
    return (
        <div className={styles.banner}>
            <Image
                src='/NoCampersFound.svg'
                alt='Camper drawing'
                className={styles.camper_image}
                width={488}
                height={463}
            ></Image>
            <h2 className={styles.title}>No campers found</h2>
            <p className={styles.description}>We couldn`t find any campers that match your filters.<br />Try adjusting your search or clearing some filters.</p>
        </div>
    );
}