import {Route,Routes} from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Footer from './components/footer';
import { Toaster } from 'react-hot-toast';
import { userAuthStore } from './store/AuthUser';
import { useEffect } from 'react';
import { Loader } from 'lucide-react';
function App() {
  const { user,isCheckingAuth,authCheck }= userAuthStore()
  useEffect(()=>{
    authCheck();
  },[authCheck]);
  if(isCheckingAuth)
  {
    return(
      <div className='h-screen'>
        <div className="flex justify-center items-center bg-black h-full">
          <Loader className='animate-spin text-red-600 size-10'/>
        </div>
      </div>
    );
  }

  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/login' element={user?<HomePage/>:<LoginPage/>} />
      <Route path='/signup' element={user?<HomePage/>:<SignUpPage/>} />
    </Routes>
    <Footer/>
    <Toaster/>
    </>
  );
}

export default App
