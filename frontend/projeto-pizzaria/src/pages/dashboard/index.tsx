import { useState } from 'react'
import { canSSRAuth } from '../../utils/canSSR.Auth'
import Head from 'next/head'
import { Header } from '../../components/Header'
import styles from './styles.module.scss'
import { FiRefreshCcw } from 'react-icons/fi'
import { setupAPIClient } from '../../services/api'

import Modal from 'react-modal'
import { ModalOrder } from '../../components/ModalOrder'
import { api } from '../../services/apiClient'

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

export type OrderItemProps = {
    id: string,
    amount: number,
    order_id: string,
    product_id: string,
    product: {
        id: string,
        name: string,
        description: string,
        price: string,
        banner: string
    }
    order: {
        id: string,
        table: string | number,
        status: boolean,
        name: string | null

    }
}

export default function DashBoard({ orders }: HomeProps) {
    const [orderList, setOrderList] = useState(orders || [])
    const [modalItem, setModalItem] = useState<OrderItemProps[]>()
    const [modalVisible, setModalVisible] = useState(false)

    // Manual  refresh
    const handleRefresh = async () => {
        const apiClient = setupAPIClient()
        const res = await apiClient.get('/order')
        setOrderList(res.data)
    }

    // Automatic refresh in 1 minute
    setTimeout(async () => {
        const apiClient = setupAPIClient()
        const res = await apiClient.get('/order')
        setOrderList(res.data)
    }, 60000)

    const handleCloseModal = () => {
        setModalVisible(false)
    }

    const handleFinishOrder = async (id: string) => {
        const apiClient = setupAPIClient()
        await apiClient.put('/order/finish', {
            order_id: id
        })

        const res = await apiClient.get('/order')
        setOrderList(res.data)

        setModalVisible(false)
    }


    const handleModal = async (id: string) => {
        const apiClient = setupAPIClient()

        const res = await apiClient.get('/order/detail', {
            params: {
                order_id: id
            }
        })

        setModalItem(res.data)
        setModalVisible(true)
    }

    Modal.setAppElement('#__next')
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
                        <FiRefreshCcw
                            size={25}
                            color='#3FFAA3'
                            onClick={() => handleRefresh()}
                        />
                    </button>
                </div>
                {orderList.length === 0 && (
                    <span className={styles.emptyList}>
                        Você não tem nenhum pedido.
                    </span>
                )}
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
            {modalVisible && (
                <ModalOrder
                    isOpen={modalVisible}
                    onRequestClose={handleCloseModal}
                    order={modalItem}
                    handleFinishOrder={handleFinishOrder}
                />
            )}
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