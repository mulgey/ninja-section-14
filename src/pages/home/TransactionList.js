// styles
import { useFirestore } from '../../hooks/useFirestore'
import styles from './Home.module.css'

export default function TransactionList({ hesapHareketleri }) {
  const { dökümanSil, response } = useFirestore('transactions');
  console.log(response);

  return (
    <ul className={styles.transactions}>
      {hesapHareketleri.map((tekilHareket) => (
        // onSnapshot forEach içerisinde her birine "id: döküman.id" eklemiştik
        <li key={tekilHareket.id}>
          <p className={styles.name}>{tekilHareket.isim}</p>
          <p className={styles.amount}>${tekilHareket.miktar}</p>
          <button onClick={() => dökümanSil(tekilHareket.id)}>x</button>
        </li>
      ))}
    </ul>
  )
}
