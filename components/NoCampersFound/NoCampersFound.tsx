import Image from 'next/image'
import styles from './NoCampersFound.module.css';
import Button from '../Button/Button';

interface NoCampersFoundProps {
    clearFilters: () => void;
    viewAllCampers: () => void; 
}

export default function NoCampersFound ({ clearFilters, viewAllCampers }: NoCampersFoundProps) {
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
            <div className={styles.btns_container}>
                <Button className={styles.btn_clear_filters} onClick={clearFilters}>
                    <svg
                        width="24"
                        height="24"
                        className={styles.close_icon}
                    >
                        <use href="/icon-sprite.svg#icon-icon-close"></use>
                    </svg>
                    Clear filters
                </Button>
                <Button className={styles.btn_view_all} onClick={viewAllCampers}>View all campers</Button>
            </div>
        </div>
    );
}