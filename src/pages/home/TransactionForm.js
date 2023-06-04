import { useEffect, useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";

export default function TransactionForm({ userID }) {
	const [isim, isimAksiyonu] =useState('')
	const [miktar, miktarAksiyonu] = useState('');
	// "transactions" isminde bir koleksiyon yoksa bile ilk eklemede bu isimde oluşturulur
	const { dökümanEkle, response } = useFirestore('transactions')


	const kayıtEkle = (aksiyon) => {
		aksiyon.preventDefault();
		dökümanEkle({
			userID,
			isim,
			miktar
		})
	}

	// eğer doc. ekleme başarılı ise formları temizle (success'i takip et, değiştiğinde true ise işleme al)
	useEffect(() => {
		if (response.success) {
			isimAksiyonu('')
			miktarAksiyonu('')
		}
	}, [response.success])

  return (
    <>
			<h3>Kayıt Ekle</h3>
			<form onSubmit={kayıtEkle}>
				<label>
					<span>Kayıt ismi:</span>
					<input
						type="text"
						required
						onChange={(e) => isimAksiyonu(e.target.value)}
						value={isim}
					/>
				</label>
				<label>
					<span>Miktar:</span>
					<input
						type="number"
						required
						onChange={(e) => miktarAksiyonu(e.target.value)}
						value={miktar}
					/>
				</label>
				<button>Kayıt Ekle</button>
			</form>
		</>
  )
}
