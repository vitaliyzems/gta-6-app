import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './Home.module.css';

const isSuccess = false;

interface IFormState {
  name: string;
  email: string;
}

function Home() {
  const { register, handleSubmit } = useForm<IFormState>();

  const onSubmit: SubmitHandler<IFormState> = (data) => {
    console.log(data);
  };
  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {isSuccess ? (
          <div className={styles.success}>Форма отправлена!</div>
        ) : (
          <>
            <h1>GTA 6 - Оставь заявку</h1>
            <input
              type="text"
              placeholder="Введите имя"
              {...register('name', { required: '' })}
            />
            <input
              type="email"
              placeholder="Введите Email"
              {...register('email', { required: '' })}
            />
            <button>Подписаться</button>
          </>
        )}
      </form>
    </div>
  );
}

export default Home;
