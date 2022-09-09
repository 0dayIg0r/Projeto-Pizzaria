import styles from './styles.module.scss'
import Modal from 'react-modal'
import { FiX } from 'react-icons/fi'

interface ModalOrderProps{
    isOpen: boolean
    onRequestClose:() => void
    order:
}
export function ModalOrder(){
    return(
        <div>
            <h1>Detalhes do pedido</h1>
        </div>
    )
}