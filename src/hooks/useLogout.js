import { useEffect, useState } from "react"
import { authFire } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const [süreçİptali, süreçİptalAksiyonu] = useState(false)
  const [hata, hataAksiyonu] = useState(null);
  const [yüklüyor, yüklemeAksiyonu] = useState(false);
  const { dispatch } = useAuthContext();

  const çıkış = async () => {
    // önceden bir hata kaldı ise onu sıfırlıyoruz
    hataAksiyonu(null);
    yüklemeAksiyonu(true);

    // logout işlemini dene
    try {
      await authFire.signOut()

      // login aksiyonunu dispatch la
      // logout için payload'a gerek yok, "user: null" yapacağız
      dispatch({ type: 'LOGOUT' })

      // eğer süreç takılmamış ise (clean-up)
      if (!süreçİptali) {
        yüklemeAksiyonu(false);
        hataAksiyonu(null);
      }

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

  return {çıkış, hata, yüklüyor}

}