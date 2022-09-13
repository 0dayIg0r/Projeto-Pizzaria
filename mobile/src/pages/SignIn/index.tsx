import React, {useState, useContext} from 'react'
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native'

import { AuthContext } from '../../contexts/AuthContext'


export default function SignIn() {
  const  {} = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  
  function handleLogin(){
    if(!email || !password){
      return
    }
    
  }


  return (
    <View style={styles.container}>
    <Image
    source={require('../../assets/logo.png')}
    style={styles.logo}
    />
    <Text>
      {user.email}
    </Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Digite seu e-mail'
          style={styles.input}
          placeholderTextColor='#F0F0F0'
          value={email}
          onChangeText={setEmail}
          
        />
        <TextInput
          placeholder='Digite sua senha'
          style={styles.input}
          placeholderTextColor='#F0F0F0'
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>
              Entrar
            </Text>
        </TouchableOpacity>
      </View>

    </View>

  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1D1D2E',
  },
  inputContainer: {
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
    paddingHorizontal: 14
  },
  logo:{
    marginBottom: 18
  },
  input:{
    width: '95%',
    height: 40,
    backgroundColor: '#101026',
    marginBottom: 12,
    borderRadius: 4,
    paddingHorizontal: 8,
    color: '#FFF',
  },
  button:{
    width: '95%',
    height: 40,
    backgroundColor: '#3FFFA3',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText:{
    fontSize: 18,
    fontWeight: 'bold',
    color: '#101026'
  }
})



