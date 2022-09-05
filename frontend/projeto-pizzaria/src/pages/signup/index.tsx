import Head from 'next/head'

// Logo
import Image from 'next/image'
// CSS
import styles from '../../../styles/home.module.scss'

import logoImg from '../../../public/logo.svg'
// Components
import { Input } from '../../components/ui/Input/Input'
import { Button } from '../../components/ui/Button/Button'

// Next Link
import Link from 'next/link'

export default function SignUp() {
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
          <form>
          <Input
              placeholder='Digite seu nome'
              type='text'
            />
            <Input
              placeholder='Digite seu e-mail'
              type='email'
            />

            <Input
              placeholder='Digite sua senha'
              type='password'
            />


            <Button 
            type='submit'
            loading={false}
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
