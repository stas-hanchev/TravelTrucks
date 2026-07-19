import { Camper } from '@/types/camper'

import styles from './CamperList.module.css'
import CamperCard from '../CamperCard/CamperCard'
import Button from '../Button/Button'

interface CamperListProps {
    campers: Camper[]
}

export default function CamperList({ campers }: CamperListProps) {
    return (
        <div className={styles.camper_list_container}>
            <ul className={styles.camper_list}>
                {campers.map((camper) => (
                    <li key={camper.id} className={styles.camper_item}>
                        <CamperCard camper={camper} />
                    </li>
                ))}
            </ul>
        </div>
    )
}
