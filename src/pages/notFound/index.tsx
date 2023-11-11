import { useNavigate } from 'react-router-dom';
import styles from './notFound.module.scss';
import image from '../../assets/img/notFoundImg.png';
import Button from '../../components/button';

export default function NotFound(): JSX.Element {
  const navigate = useNavigate();

  const goToMainPage = (): void => {
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles['image-container']}>
        <img src={image} alt="404" />
      </div>
      <p>Something went wrong</p>
      <Button name="Go to main page" onClick={goToMainPage} />
    </div>
  );
}
