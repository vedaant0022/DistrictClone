import { View, Text } from 'react-native'
import React from 'react'
import Nav from './src/navigation/Nav'
import FlashMessage from 'react-native-flash-message'

const App = () => {
  return (
    <View style={{flex:1}}>
      <Nav />
      <FlashMessage />
      {/* <Text>Hello</Text> */}
    </View>
  )
}

export default App