import Image from 'next/image';

import largeWordmark from 'public/assets/logo/Waves Wordmark Large.png';
import styles from './styles.module.css';

export default function Home() {
  return (
    <main className={styles.homeContainer}>
      <Image src={largeWordmark} alt="Wavez: All the vibes" />
    </main>
  );
}
