import React, { useState,  useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, SafeAreaView, Keyboard } from 'react-native';
import api from './src/axios/api'

export default function App() {

  const [cep, setCep] = useState('');
  const inputRef = useRef(null);
  const [cepUser, setCepUser] = useState(null)

  async function Buscar() {
    if (cep == '') {
      alert('Informe um cep Valido');
      setCep('');
      return;
    }
    try {
      const response = await api.get(`/${cep}/json`);
      setCepUser(response.data)
      Keyboard.dismiss()
    } catch (error) {
      console.log(error)
    }

  }

  function Limpar() {
    setCep('')
    inputRef.current.focus()
    setCepUser(null)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.text}>Digite o cep desejado</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 62785000"
          value={cep}
          onChangeText={(text) => setCep(text)}
          keyboardType="numeric"
          ref={inputRef}
        />
      </View>

      <View style={styles.btnArea}>
        <TouchableOpacity style={[styles.btn, { backgroundColor: '#1d75cd' }]} onPress={Buscar} >
          <Text style={styles.btnText}>Buscar</Text>
        </TouchableOpacity>


        <TouchableOpacity style={[styles.btn, { backgroundColor: '#cd3e1d' }]} onPress={Limpar}>
          <Text style={styles.btnText}>Limpar</Text>
        </TouchableOpacity>
      </View>


      {cepUser &&
        <View style={styles.result}>
          <Text style={styles.itemText}>CEP: {cepUser.cep} </Text>
          <Text style={styles.itemText}>Logradouro: {cepUser.logradouro}</Text>
          <Text style={styles.itemText}>Bairro:  {cepUser.bairro}</Text>
          <Text style={styles.itemText}>Cidade: {cepUser.localidade} </Text>
          <Text style={styles.itemText}>Estado:  {cepUser.uf} </Text>
        </View>
      }


    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  text: {
    marginTop: 25,
    marginBottom: 15,
    fontSize: 20,
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 0.8,
    borderColor: 'gray',
    borderRadius: 5,
    width: '90%',
    padding: 10,
    fontSize: 17
  },
  btnArea: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'space-around'
  },
  btn: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5
  },
  btnText: {
    fontSize: 15,
    color: 'white'
  },
  result: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemText: {
    fontSize: 20
  }
});
