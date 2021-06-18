import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Button, Input, Image } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase';


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace("Home")
      }
    })

    return unsubscribe;
  }, [])

  const signIn = () => {
    auth.signInWithEmailAndPassword(email, password).catch(error => {
      alert(error)
    })
  }


  return (
    <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
      <StatusBar style="light" />
      <Image source={{ uri: "https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png" }}
        style={{ width: 200, height: 200, }} />
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          autoFocus
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)} />
        <Input
          placeholder="Password"
          type="password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
          onSubmitEditing={signIn}

        />
      </View>

      <Button containerStyle={styles.button} onPress={signIn} title="Login" />
      <Button containerStyle={styles.button} onPress={() => navigation.navigate("Register")} type="clear" title="Register" />
      {/* <View style={{ height: 100 }}></View> */}
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,

  },
  inputContainer: {
    width: 300
  },
  button: {
    width: 200,
    marginTop: 10,
  }
})
