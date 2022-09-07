import { AppProps } from 'next/app'
import '../../styles/globals.scss'

// Context
import { AuthProvider } from '../contexts/AuthContext'

// Toastfiy
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <ToastContainer autoClose={3000}/>
    </AuthProvider>
  )
}

export default MyApp
