import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { api } from '../../services/api'

interface ItemProps {
    data: {
        id: string,
        product_id: string,
        name:string,
        amount: string | number
    }
    deleteItem: (item_ìd: string) => void
}
function ListItem({ data, deleteItem }: ItemProps) {

    function handleDelete (){
       deleteItem(data.id)
    }
    return (
        <View style={styles.container}>
            <Text style={styles.item}>{data.amount} - {data.name}</Text>
            <Feather name='trash-2' size={28} color='#FF3F4B' onPress={handleDelete}/>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        backgroundColor: '#101026',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom:12, 
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 4,
        borderWidth: 0.3,
        borderColor: '#8A8A8A'
    },
    item: {
        color: '#FFF'
    }
})

export default ListItem