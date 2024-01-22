import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './Home.module.css';
import { useState } from 'react';

interface IFormState {
  name: string;
  email: string;
}

function Home() {
  const { register, handleSubmit, reset } = useForm<IFormState>();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit: SubmitHandler<IFormState> = async (data) => {
    setIsLoading(true);
    const response = await fetch('http://localhost:9999/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      console.log(await response.json());
      setIsSuccess(true);
      setIsLoading(false);
      reset();
      return;
    }
    setIsSuccess(false);
    setIsLoading(false);
    console.log({ status: response.status, message: response.statusText });
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
            <button disabled={isLoading}>
              {isLoading ? 'Загрузка...' : 'Подписаться'}
            </button>
          </>
        )}
      </form>
    </div>
  );
}

export default Home;
