import { useContext } from 'react'
import styles from './styles.module.scss'
import Link from 'next/link'
import { FiLogOut } from 'react-icons/fi'
import { AuthContext } from '../../contexts/AuthContext'


export function Header() {
    const { singOut } = useContext(AuthContext)
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href='/dashboard'>
                    <img src="/logo.svg" width={190} height={60} />
                </Link>

                <nav className={styles.nav}>
                    <Link href='/category'>
                        <a>Categoria</a>
                    </Link>

                    <Link href='/product'>
                        <a>Cardapio</a>
                    </Link>

                    <button>
                        <FiLogOut color='#FFF' size={20} onClick={singOut} />
                    </button>
                </nav>

            </div>
           
        </header>
    )
}