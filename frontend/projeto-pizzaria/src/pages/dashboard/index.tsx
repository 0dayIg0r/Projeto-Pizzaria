import { useState } from 'react'
import { canSSRAuth } from '../../utils/canSSR.Auth'
import Head from 'next/head'
import { Header } from '../../components/Header'
import styles from './styles.module.scss'
import { FiRefreshCcw } from 'react-icons/fi'
import { setupAPIClient } from '../../services/api'


type OrderProps = {
    id: string,
    table: string,
    status: boolean,
    draft: boolean,
    name: string | null
}
interface HomeProps {
    orders: OrderProps[]
}

export default function DashBoard({ orders }: HomeProps) {
    const [orderList, setOrderList] = useState(orders || [])

    const handleModal = (id: string) =>{
        
    }
    return (
        <>
            <Head>
                <title> Painel - Sujeito Pizzaria</title>
            </Head>

            <Header />

            <main className={styles.container}>
                <div className={styles.containerHeader}>
                    <h1>Últimos pedidos</h1>
                    <button>
                        <FiRefreshCcw size={25} color='#3FFAA3' />
                    </button>
                </div>

                <article className={styles.listOrders}>
                    {orderList.map((item) => (
                        <section className={styles.orderItem} key={item.id}>
                            <button onClick={() => handleModal(item.id)}>
                                <div className={styles.tag}></div>
                                <span>Mesa {item.table}</span>
                            </button>
                        </section>
                    ))}
                </article>
            </main>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx)
    const res = await apiClient.get('/order')

    return {
        props: {
            orders: res.data
        }
    }
})