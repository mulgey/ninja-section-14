import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection';

// styles
import styles from './Home.module.css'

// components
import TransactionForm from './TransactionForm'
import TransactionList from './TransactionList';

export default function Home() {
  // userID'yi transaction form ve list te kullanacağımız için buradan import edip aşağıda dağıttık
  const { user } = useAuthContext();
  // koleksiyon ismini vererek tüm döküman nesnelerini array içerisinde alıyoruz
  const { dökümanlar, hata } = useCollection(
    'transactions',
    // döküman içerisindeki "userID", giriş yapmış olan "user.uid" ile karşılaştırılıp filtrelenir useCollection içerisinde
    // ama bunu kaldırıp null girdik data protection sürecinde. firestore rules düzenlendikten sonra auth kontrollerini oradan yaptık (x)
    ["userID", "==", user.uid],
    // null,
    // orderBy fonk. için hangi özelliği sıralayacağımızı ve nasıl sıralayacağımızı belirtiyoruz
    ["oluşturmaZamanı", "desc"]
  )
  
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {hata && <p>{hata}</p>}
        {dökümanlar && <TransactionList hesapHareketleri={dökümanlar}/>}
      </div>
      <div className={styles.sidebar}>
        <TransactionForm userID={user.uid} />
      </div>     
    </div>
  )
}