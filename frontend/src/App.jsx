import { Routes, Route, Navigate } from 'react-router-dom';
import ChatPage from './pages/ChatPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import { useAuthStore } from './store/useAuthStore';
import { useEffect } from 'react';
import { PageLoader } from './components/PageLoader';
import { Toaster } from 'react-hot-toast';

function App() {
  const {authUser, isCheckingAuth, checkAuth} = useAuthStore();
  
  useEffect(() => {
    checkAuth()
  },[]);

  console.log("check user : ", authUser);

  if(isCheckingAuth) return <PageLoader/>;

  return (
    <div>
     {/* <button className='btn btn-primary text-white font-bold border-none border-zinc-800' onClick={() => login()}>Login</button> */}
      <Routes>
        <Route path='/' element={ authUser ? <ChatPage/> : <Navigate to="/login"/>}></Route>
        <Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to="/"/>}></Route>
        <Route path='/login' element={!authUser ?<LoginPage /> : <Navigate to="/"/>}></Route>
        <Route path='/chat' element={<ChatPage />}></Route>
      </Routes>
    </div>
  )
}

export default App
