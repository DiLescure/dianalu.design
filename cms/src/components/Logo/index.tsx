import Image from 'next/image';
import type { CustomComponent } from 'payload';
import LogoImageLight from './logo-black.svg';
import LogoImageDark from './logo-white.svg';
import styles from './styles.module.css';

/* @ts-ignore */
const Logo: CustomComponent<Record<string, any>> = () => {
  return (
    <>
      <Image className={styles.logoLight} src={LogoImageLight} alt="Company Logo" width={300} />
      <Image className={styles.logoDark} src={LogoImageDark} alt="Company Logo" width={300} />
    </>
  );
};

export default Logo;
