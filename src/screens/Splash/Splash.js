import { View, Text, SafeAreaView, Image } from 'react-native'
import React, { useEffect } from 'react'
import { moderateScale, moderateScaleVertical } from '../../styles/responsive/responsiveSize'
import { showMessage } from 'react-native-flash-message';
import { successMessage } from '../../utils';

const Splash = ({navigation, route}) => {
    useEffect(() =>{
        setTimeout(()=>{
            successMessage("Welcome to App")
            navigation.navigate('Login');
        },3000);
    },[]);
  return (
    <SafeAreaView style={{flex:1, backgroundColor:'#131315'}}>
        <View style={{flex:1, backgroundColor:'#131315'}}>
            <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
                <Image
                source={require('../../assets/Splash/Splashfinal.png')}
                style={{height:moderateScaleVertical(200),width:moderateScale(200)}}
                resizeMode='contain'
                />
            </View>
        </View>
    </SafeAreaView>
  )
}

export default Splash