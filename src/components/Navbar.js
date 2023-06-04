import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout'

// styles
import styles from './Navbar.module.css'

export default function Navbar() {
  const { çıkış } = useLogout();
  const { user } = useAuthContext()

  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={styles.title}><Link to='/'>menkulDeğerler</Link></li>

        {/* kullanıcı yoksa gösterilecek kısım */}
        {!user && (
          // böyle bir template kullanırken sadece 1-root element hakkımız var
          // o yüzden fragment tercih ettik
          <>
            <li><Link to='/login'>Login</Link></li>
            <li><Link to='/signup'>Signup</Link></li>
          </>
        )}

        {/* kullanıcı varsa gösterilecek kısım */}
        {user && (
          // böyle bir template kullanırken sadece 1-root element hakkımız var
          // o yüzden fragment tercih ettik
          <>
            <li>Merhaba sevgili {user.displayName}..!</li>
            <li>
              <button className='btn' onClick={çıkış}>Logout</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}
