import React, { useContext } from 'react'
import { View, Text, Button } from 'react-native'
import { AuthContext } from '../../contexts/AuthContext'


function Dashboard() {
  const { signOut } = useContext(AuthContext)
  return (
    <View>
      <Text>
        Dashboard
      </Text>

      <Button
      title='Sair'
      onPress={signOut}
      />
    </View>
  )
}

export default Dashboard