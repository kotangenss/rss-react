import { useRouter } from 'next/router';
import Image from 'next/image';
import image from 'public/img/notFoundImg.png';
import Button from '../button';
import styles from './index.module.scss';

export default function NotFound(): JSX.Element {
  const router = useRouter();

  const onClick = (): void => {
    router.push('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles['image-container']}>
        <Image src={image.src} alt="404" width={1000} height={434} />
      </div>
      <p>Something went wrong</p>
      <Button name="Go to main page" onClick={onClick} />
    </div>
  );
}
