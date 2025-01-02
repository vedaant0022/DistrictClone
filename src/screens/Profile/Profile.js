import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import Header from '../../components/Header/Header'
import { moderateScale } from '../../styles/responsive/responsiveSize'

const Profile = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#131315' }}>
      <View style={{ marginLeft: moderateScale(15), marginRight: moderateScale(15) }}>
        <Header
          name="Profile"
        />
      </View>
    </SafeAreaView>
  )
}

export default Profile