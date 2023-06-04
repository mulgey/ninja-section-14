import { useEffect, useState } from "react"
import { authFire } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [süreçİptali, süreçİptalAksiyonu] = useState(false);
  const [hata, hataAksiyonu] = useState(null);
  const [yüklüyor, yüklemeAksiyonu] = useState(false);
  const { dispatch } = useAuthContext();

  const kayıt = async (eposta, şifre, kullanıcı) => {
    // önceden bir hata kaldı ise onu sıfırlıyoruz
    hataAksiyonu(null);
    yüklemeAksiyonu(true);

    try {
      // kayıt işlemini gerçekleştir
      const yanıt = await authFire.createUserWithEmailAndPassword(eposta, şifre);
      console.log(yanıt.user);

      // bağlantı kötü veya hatalı ise manuel hata atarız
      if (!yanıt) {
        throw new Error('Kayıt işlemi tamamlanamadı')
      }

      // kullanıcıya kullanıcıAdı eklemeyi eposta ve şifre eklemek dışında güncelleme ile yapabiliyoruz
      // eğer kullanıcı yerine displayName kullansaydık { displayName } yeterli olacaktı
      await yanıt.user.updateProfile({ displayName: kullanıcı });

      // login aksiyonunu dispatch le
      dispatch({ type: 'LOGIN', payload: yanıt.user })

      // eğer süreç takılmamış ise (clean-up)
      if (!süreçİptali) {
        yüklemeAksiyonu(false);
        hataAksiyonu(null);
      }
    
    // şifre çok kısa olabilir, email daha önce alınmış olabilir
    } catch (err) {
      // eğer süreç takılmamış ise (clean-up)
      if (!süreçİptali) {
        hataAksiyonu(err.message)
        yüklemeAksiyonu(false);
      }
    }

  }

  useEffect(() => {
    // süreç iptal olursa (unmount) clean-up fonksiyonunu çalıştırıyoruz
    return () => süreçİptalAksiyonu(true);
  }, [])

  return { hata, yüklüyor, kayıt };
}