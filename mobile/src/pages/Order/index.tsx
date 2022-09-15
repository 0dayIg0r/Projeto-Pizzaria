import React, { useState, useEffect } from 'react'
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import { api } from '../../services/api'

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Modal,
    FlatList
} from 'react-native'

import ModalPicker from '../../components/ModalPicker'
import ListItem from '../../components/ListItem/Index'

import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackParamList } from '../../routes/app.routes'


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
// if you wanna pick more data just add in the type, description, price, etc..
type ProductProps = {
    id: string,
    name: string
}

type ItemProps = {
    id: string,
    product_id: string,
    name: string,
    amount: string | number
}

type OrderRouteProps = RouteProp<RouteDetailParams, 'Order'>

function Order() {
    const route = useRoute<OrderRouteProps>()
    const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>()
    

    const [category, setCategory] = useState<CategoryProps[] | []>([])
    const [categorySelected, setCategorySelected] = useState<CategoryProps | undefined>()
    const [showModal, setShowModal] = useState(false)

    const [products, setProducts] = useState<ProductProps[] | []>([])
    const [productSelected, setProductSelected] = useState<ProductProps | undefined>()
    const [amount, setAmout] = useState('1')
    const [showModalProdutc, setShowModalProduct] = useState(false)
    const [items, setItems] = useState<ItemProps[]>([])



    useEffect(() => {
        async function loadInfo() {
            const res = await api.get('/category')
            setCategory(res.data)
            setCategorySelected(res.data[0])
        }

        loadInfo()
    }, [])


    useEffect(() => {
        async function loadProducts() {
            const res = await api.get('/category/products', {
                params: {
                    category_id: categorySelected?.id
                }
            })
            setProducts(res.data)
            setProductSelected(res.data[0])
        }

        loadProducts()
    }, [categorySelected])


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

    function handleProduct(item: ProductProps) {
        setProductSelected(item)
    }

    async function handleAdd() {
        const res = await api.post('/order/add', {
            order_id: route.params.order_id,
            name: productSelected?.name,
            product_id: productSelected?.id,
            amount: Number(amount)
        })

        let data = {
            id: res.data.id,
            product_id: productSelected?.id as string,
            name: productSelected?.name as string,
            amount: amount
        }

        setItems(oldArray => [...oldArray, data])
    }

    async function handleDeleteItem(item_id: string) {
        await api.delete('/order/remove', {
            params: {
                item_id: item_id
            }
        })

        let removeItem = items.filter(item => {
            return (item.id !== item_id)
        })
        setItems(removeItem)
    }

     function handleFinishOrder() {
        navigation.navigate('FinishOrder', {
            number:route.params?.number,
            order_id: route.params?.order_id
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}> Mesa {route.params.number}</Text>

                <TouchableOpacity onPress={handleCloseOrder}>
                    {items.length === 0 && (
                        <Feather name='trash-2' size={28} color='#FF3F4B' />
                    )}
                </TouchableOpacity>
            </View>

            {category.length !== 0 && (
                <TouchableOpacity style={styles.input} onPress={() => setShowModal(true)}>
                    <Text style={{ color: '#fff' }}>
                        {categorySelected?.name}
                    </Text>
                </TouchableOpacity>
            )}

            {products.length !== 0 && (
                <TouchableOpacity style={styles.input} onPress={() => setShowModalProduct(true)}>
                    <Text style={{ color: '#fff' }}>{productSelected?.name}</Text>
                </TouchableOpacity>
            )}

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
                <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleFinishOrder}
                    style={[styles.button, { opacity: items.length === 0 ? 0.3 : 1 }]}
                    disabled={items.length === 0}

                >
                    <Text style={styles.buttonText}>Avançar</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                showsVerticalScrollIndicator={false}
                style={{ flex: 1, marginTop: 24 }}
                data={items}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <ListItem data={item} deleteItem={handleDeleteItem} />}
            />

            <Modal
                transparent={true}
                visible={showModal}
                animationType='fade'
            >
                <ModalPicker
                    handlecloseModal={() => setShowModal(false)}
                    options={category}
                    selectedItem={handleCategory}
                />
            </Modal>

            <Modal
                transparent={true}
                visible={showModalProdutc}
                animationType='fade'
            >
                <ModalPicker
                    handlecloseModal={() => setShowModalProduct(false)}
                    options={products}
                    selectedItem={handleProduct}
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