import { Routes, Route } from 'react-router-dom';
import ChatPage from './pages/ChatPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import { useAuthStore } from './store/useAuthStore';

function App() {
  const {authUser, isLoading, login, isLoggedIn} = useAuthStore();

  // console.log("authUser : ", authUser);
  // console.log("isLoading : ", isLoading);
  // console.log("login : ", login);
  // console.log("isLoggedIn: ", isLoggedIn);

  return (
    <div>
     {/* <button className='btn btn-primary text-white font-bold border-none border-zinc-800' onClick={() => login()}>Login</button> */}
      <Routes>
        <Route path='/signup' element={<SignUpPage />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/chat' element={<ChatPage />}></Route>
      </Routes>
    </div>
  )
}

export default App
