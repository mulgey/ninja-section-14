import { useState } from 'react'
import { useSignup } from '../../hooks/useSignup';

import styles from './Signup.module.css'

export default function Signup() {
  const [eposta, epostaAksiyonu] = useState('');
  const [şifre, şifreAksiyonu] = useState('');
  const [kullanıcı, kullanıcıAksiyonu] = useState('');
  // grab the hook !!
  const { hata, yüklüyor, kayıt } = useSignup();

  const kayıtFonksiyonu = (aksiyon) => {
    // kayıt ol dediğimizde (doğal bir davranış olan) sayfa yenilemeyi engelledik
    aksiyon.preventDefault();
    // kayıt işlemi başlasın
    // hook içindeki sıranın aynısı olacak şekilde yazdık
    kayıt(eposta, şifre, kullanıcı)
  }

  return (
    // "styles.signup-form" className içerisinde düzgün çalışmaz
    <form onSubmit={kayıtFonksiyonu} className={styles['signup-form']}>
      <h2>Signup</h2>
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
      <label>
        <span>kullanıcı:</span>
        <input
          type='text'
          onChange={(e) => kullanıcıAksiyonu(e.target.value)}
          // her zamanki gibi two-way binding uyguluyoruz aşağıda
          value={kullanıcı}
        />
      </label>
      {!yüklüyor && <button className='btn'>Kayıt ol!</button>}
      {/* içeriği DOM'a yansıtma zamanı */}
      {hata && <p>{hata}</p>}
      {yüklüyor && <button className='btn' disabled>Yükleniyor</button>}
    </form>
  )
}