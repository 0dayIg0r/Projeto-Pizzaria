// React imports
import { useContext, FormEvent, useState } from 'react'

// Imports  next
import Head from 'next/head'
import Link from 'next/link'

// Logo
import Image from 'next/image'

// CSS
import styles from '../../styles/home.module.scss'

// Logo import
import logoImg from '../../public/logo.svg'

// Components
import { Input } from '../components/ui/Input/Input'
import { Button } from '../components/ui/Button/Button'

// Private routes
import { canSSRGuest } from '../utils/canSSR.Guest'

// Context
import { AuthContext } from '../contexts/AuthContext'

// Toastfiy
import { toast } from 'react-toastify'


export default function Home() {
  const {sigIn} = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: FormEvent) {
    e.preventDefault()

    if(email === '' || password === ''){
      toast.error('Preencha todos os campos!')
      
      return
    }

    setLoading(true)
    
    
    let data = {
      email,
      password
    }
    
    await sigIn(data)
    
    setLoading(false)
    
  }

  return (
    <>
      <Head>
        <title>
          Sujeito Pizza - Faça seu login
        </title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt='Logo Sujeiro Pizzaria' />

        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input
              placeholder='Digite seu e-mail'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              placeholder='Digite sua senha'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />


            <Button
              type='submit'
              loading={loading}
            >
              Acessar
            </Button>
          </form>

          <Link href='/signup'>
            <a className={styles.text}>
              Não possui uma conta? <b>Cadastre-se</b>
            </a>
          </Link>
        </div>
      </div>
    </>
  )
  
}


export const getServerSideProps = canSSRGuest(async (ctx) =>{
  return{
      props:{}
  }
})