import { useState } from 'react'
import { useLogin } from '../../hooks/useLogin';

// styles
import styles from './Login.module.css'

export default function Login() {
  const [eposta, epostaAksiyonu] = useState('');
  const [şifre, şifreAksiyonu] = useState('');
  const { giriş, hata, yüklüyor } = useLogin()

  const girişFonksiyonu = (aksiyon) => {
    // giriş yap dediğimizde (doğal bir davranış olan) sayfa yenilemeyi engelledik
    aksiyon.preventDefault();
    // login için gereken argümanları vererek login sağladık
    giriş(eposta, şifre)
  }

  return (
    // "styles.login-form" className içerisinde düzgün çalışmaz
    <form onSubmit={girişFonksiyonu} className={styles['login-form']}>
      <h2>Login</h2>
      <label>
        <span>email:</span>
        <input
          type='email'
          onChange={(e) => epostaAksiyonu(e.target.value)}
          // her zamanki gibi two-way binding uyguluyoruz aşağıda
          value={eposta}
        />
      </label>
      <label>
        <span>password:</span>
        <input
          type='password'
          onChange={(e) => şifreAksiyonu(e.target.value)}
          // her zamanki gibi two-way binding uyguluyoruz aşağıda
          value={şifre}
        />
      </label>
      {!yüklüyor && <button className='btn'>Giriş yap!</button>}
      {yüklüyor && <button className='btn' disabled>Giriş yapılıyor ...</button>}
      {hata && <p>{hata}</p>}

    </form>
  )
}
