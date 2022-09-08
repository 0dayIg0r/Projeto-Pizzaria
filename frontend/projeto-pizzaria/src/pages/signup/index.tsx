// React imports
import { FormEvent, useState, useContext } from 'react'

// Next Imports
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

// CSS
import styles from '../../../styles/home.module.scss'

// Logo
import logoImg from '../../../public/logo.svg'

// Components
import { Input } from '../../components/ui/Input/Input'
import { Button } from '../../components/ui/Button/Button'

// Context
import { AuthContext } from '../../contexts/AuthContext'

// Toastfiy
import { toast } from 'react-toastify'

// Auth verify
import { canSSRGuest } from '../../utils/canSSR.Guest'


export default function SignUp() {
  const { singUp } = useContext(AuthContext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)

  async function handleSignUp(e: FormEvent) {
    e.preventDefault()

    if (name === '' || email === '' || password === '') {
      toast.error('Todos os campos são obrigatórios!')
      
      return
    }

    setLoading(true)

    let data = {
      name,
      email,
      password
    }

    await singUp(data)

    setLoading(false)

  }

  return (
    <>
      <Head>
        <title>
          Sujeito Pizza - Faça seu cadastro agora
        </title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt='Logo Sujeiro Pizzaria' />

        <div className={styles.login}>

          <h1>Craindo sua conta</h1>

          <form onSubmit={handleSignUp}>
            <Input
              placeholder='Digite seu nome'
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
              Cadastrar
            </Button>
          </form>

          <Link href='/'>
            <a className={styles.text}>
              Já possui uma conta? <b>Fazer login</b>
            </a>
          </Link>
        </div>
      </div>
    </>
  )
}


export const getServerSideProps = canSSRGuest (async (ctx)=>{
  return{
    props:{}
  }
})