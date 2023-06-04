import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

// pages & components
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Navbar from './components/Navbar';
import { useAuthContext } from './hooks/useAuthContext';

function App() {
  // authHazırKıta olmadan içeriği yükleme lütfen
  const { authHazırKıta, user } = useAuthContext()

  return (
    <div className="App">
      {authHazırKıta && (
        <BrowserRouter>
          <Navbar />
          <Switch>
              <Route exact path='/'>
                {/* kullanıcı varsa Home gösterilir, yoksa Giriş ekranına */}
                {!user && <Redirect to='/login' />}
                {user && <Home/>}
              </Route>
              <Route path='/login'>
                {/* kullanıcı yoksa Login gösterilir, varsa Home ekranına */}
                {/* kullanıcı giriş yaptığında Home'a geçmesini sağlar */}
                {user && <Redirect to='/' />}
                {!user && <Login/>}
              </Route>
              <Route path='/signup'>
                {user && <Redirect to='/' />}
                {!user && <Signup/>}
              </Route>
              <Route path='*'>
                <Redirect to='/'/>
              </Route>
          </Switch>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App