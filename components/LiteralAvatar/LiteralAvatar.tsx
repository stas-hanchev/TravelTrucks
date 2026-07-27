import styles from './LiteralAvatar.module.css';

import { getFirstUpperCase } from '@/lib/labelUtils';

interface LiteralAvatarProps {
    name: string;
}

export default function LiteralAvatar({ name }: LiteralAvatarProps) {
    return (<div className={styles.avatar}>
        <p className={styles.letter}>{getFirstUpperCase(name)}</p>
    </div>);
}