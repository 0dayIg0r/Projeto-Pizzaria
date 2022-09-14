import React, { useState, useEffect } from 'react'
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native'
import Routes from '../../routes'
import { Feather } from '@expo/vector-icons'
import { api } from '../../services/api'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Modal
} from 'react-native'
import ModalPicker from '../../components/ModalPicker'

type RouteDetailParams = {
    Order: {
        number: string | number,
        order_id: string
    }
}

export type CategoryProps = {
    id: string,
    name: string
}

type OrderRouteProps = RouteProp<RouteDetailParams, 'Order'>

function Order() {
    const route = useRoute<OrderRouteProps>()
    const navigation = useNavigation()

    const [category, setCategory] = useState<CategoryProps[] | []>([])
    const [categorySelected, setCategorySelected] = useState<CategoryProps>()
    const [amount, setAmout] = useState('1')
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        async function loadInfo() {
            const res = await api.get('/category')
            setCategory(res.data)
            setCategorySelected(res.data[0])
        }

        loadInfo()
    }, [])



    async function handleCloseOrder() {
        try {
            await api.delete('/order', {
                params: {
                    order_id: route.params?.order_id
                }
            })
            navigation.goBack()

        } catch (e: any) {
            console.log(e.message)
        }
    }

    function handleCategory(item: CategoryProps) {
        setCategorySelected(item)
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}> Mesa {route.params.number}</Text>

                <TouchableOpacity onPress={handleCloseOrder}>
                    <Feather name='trash-2' size={28} color='#FF3F4B' />
                </TouchableOpacity>
            </View>

            {category.length !== 0 && (
                <TouchableOpacity style={styles.input} onPress={() => setShowModal(true)}>
                    <Text style={{ color: '#fff' }}>
                        {categorySelected?.name}
                    </Text>
                </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.input}>
                <Text style={{ color: '#fff' }}>Pizza de calabresa</Text>
            </TouchableOpacity>

            <View style={styles.qtyContainer}>
                <Text style={styles.qtyText}> Quantidade</Text>

                <TextInput
                    style={[styles.input, { width: '60%', textAlign: 'center' }]}
                    keyboardType='numeric'
                    value={amount}
                    onChangeText={setAmout}
                />
            </View>

            <View style={styles.actions}>
                <TouchableOpacity style={styles.buttonAdd}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Avançar</Text>
                </TouchableOpacity>
            </View>

            <Modal
                transparent={true}
                visible={showModal}
                animationType='fade'
            >
                <ModalPicker
                handlecloseModal={() => setShowModal(false)}
                options ={category}
                selectedItem ={handleCategory}
                />
            </Modal>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1D1D2E',
        paddingVertical: '5%',
        paddingEnd: '4%',
        paddingStart: '4%'
    },
    header: {
        flexDirection: 'row',
        marginBottom: 12,
        alignItems: 'center',
        marginTop: 24,
    },
    title: {
        color: '#FFF',
        fontSize: 30,
        fontWeight: 'bold',
        marginRight: 14
    },
    input: {
        backgroundColor: '#101026',
        borderRadius: 4,
        width: '100%',
        height: 40,
        marginBottom: 12,
        justifyContent: 'center',
        paddingHorizontal: 8,
        color: '#FFF',
        fontSize: 20
    },
    qtyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    qtyText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF'
    },
    actions: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    buttonAdd: {
        width: '20%',
        backgroundColor: '#3FD1FF',
        borderRadius: 4,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#101026',
        fontSize: 18,
        fontWeight: 'bold',

    },
    button: {
        backgroundColor: '#3FFfA3',
        borderRadius: 4,
        height: 40,
        width: '75%',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Order