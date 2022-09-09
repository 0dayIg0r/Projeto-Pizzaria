import { ChangeEvent, FormEvent, useState } from 'react';
import Head from 'next/head';
import { canSSRAuth } from '../../utils/canSSR.Auth';
import { Header } from '../../components/Header';
import styles from './styles.module.scss'
import { FiUpload } from 'react-icons/fi'
import { setupAPIClient } from '../../services/api';
import { toast } from 'react-toastify';


type ItemProps = {
    id:string,
    name: string
}

interface CategoryProps{
    categoryList: ItemProps[]
}

export default function Product({ categoryList}: CategoryProps) {

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    
    const [avatarUrl, setAvatarUrl] = useState('')
    const [imageAvatar, setImageAvatar] = useState(null)
    const [categories, setCategories ] = useState(categoryList || [])
    const [categorySelected, setCategorySelected] = useState(0)
   

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

    const handleChangeCategory = (e) =>{
        setCategorySelected(e.target.value)
        console.log(categorySelected)

    }

    async function handleRegister(e:FormEvent){
        e.preventDefault()

        try {
            const data = new FormData()

            if(name === '' || price === '' || description === '' || imageAvatar === null){
                toast.error('Preencha todos os campos')
                return
            }

            data.append('name', name)
            data.append('price', price)
            data.append('description', description)
            data.append('category_id', categories[categorySelected].id)
            data.append('file', imageAvatar)

            const apiClient = setupAPIClient()
            await apiClient.post('/product', data)

            toast.success('Produto cadastrado!')

            
        } catch (e) {
            toast.error('Ocorreu um erro, tente novamente mais tarde!')
            console.log(e.message)
        }

        setName('')
        setPrice('')
        setDescription('')
        setImageAvatar(null)
        setAvatarUrl('')
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

                    <form className={styles.form} onSubmit={handleRegister}>

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

                        <select value={categorySelected} onChange={handleChangeCategory}>
                            {categories.map((item,index)=>{
                                return(
                                    
                                    <option value={index} key={item.id}>
                                        {item.name}
                                    </option>
                                    
                                )
                            })}
                        </select>

                        <input
                            type='text'
                            placeholder='Nome do produto'
                            className={styles.input}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type='text'
                            placeholder='Valor'
                            className={styles.input}
                            value={price}onChange={(e) => setPrice(e.target.value)}
                        />

                        <textarea
                            className={styles.input}
                            placeholder='Descrição do produto'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
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
    const apiClient = setupAPIClient(ctx)
    const res = await apiClient.get('/category')
    

    return {
        props: {
            categoryList: res.data
        }
    }
})

