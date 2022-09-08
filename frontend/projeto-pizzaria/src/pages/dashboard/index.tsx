import { canSSRAuth } from '../../utils/canSSR.Auth'

import Head from 'next/head'
import { Header } from '../../components/Header'

export default function DashBoard(){
    return(
        <>
            <Head>
                <title> Painel - Sujeito Pizzaria</title>
            </Head>

            <Header/>
            <h1>Painel</h1>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) =>{
    return{
        props:{}
    }
})