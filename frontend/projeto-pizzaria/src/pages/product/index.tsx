import { ChangeEvent, useState } from 'react';
import Head from 'next/head';
import { canSSRAuth } from '../../utils/canSSR.Auth';
import { Header } from '../../components/Header';
import styles from './styles.module.scss'
import { FiUpload } from 'react-icons/fi'

export default function Product() {
    const [avatarUrl, setAvatarUrl] = useState('')
    const [imageAvatar, setImageAvatar] = useState(null)

    const handleFile = (e: ChangeEvent<HTMLInputElement>) => {

        if (!e.target.files) {
            return
        }

        const image = e.target.files[0]

        if (!image) {
            return
        }

        if (image.type === 'image/jpeg' || image.type === 'image/png') {
            3
            setAvatarUrl(URL.createObjectURL(e.target.files[0]))
            setImageAvatar(image)

        }

    }
    return (
        <>
            <Head>
                <title>
                    Novo produto - Sujeito Pizzaria
                </title>
            </Head>

            <div>
                    <Header />

                    <main className={styles.container}>
                        <h1>Novo produto</h1>

                        <form className={styles.form}>

                            <label className={styles.labelAvatar}>
                                <span>
                                    <FiUpload size={30} color='#FFF' />
                                </span>

                                <input type='file' accept='image/png, image/jpeg' onChange={handleFile} />

                                {
                                    avatarUrl && (
                                        <img
                                            src={avatarUrl}
                                            alt='Foto do produto'
                                            width={250}
                                            height={250}
                                            className={styles.preview}
                                        />
                                    )
                                }
                            </label>

                            <select>
                                <option>
                                    1
                                </option>
                                <option>
                                    2
                                </option>
                            </select>

                            <input
                                type='text'
                                placeholder='Nome do produto'
                                className={styles.input}
                            />
                            <input
                                type='text'
                                placeholder='Valor'
                                className={styles.input}
                            />

                            <textarea
                                className={styles.input}
                                placeholder='Descrição do produto'
                            />

                            <button
                                className={styles.buttonAdd}
                                type='submit'
                            >
                                Cadastrar
                            </button>
                        </form>
                    </main>
                </div>
        </>
    )
}


export const getServerSideProps = canSSRAuth(async (ctx) => {
    return {
        props: {}
    }
})