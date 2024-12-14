import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import { moderateScale, moderateScaleVertical } from '../../styles/responsive/responsiveSize'
import { useNavigation } from '@react-navigation/native'

const Header = (props) => {
    const navigation = useNavigation()
    return (
        <SafeAreaView>
            <View style={{ backgroundColor: '#131315', height: 60, justifyContent: 'space-between', alignItems: 'center' ,flexDirection:'row'}}>
                <View>
                    <TouchableOpacity
                    onPress={()=>{navigation.goBack()}}
                    >
                        <Image
                            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3114/3114883.png' }}
                            style={{ tintColor: '#fff', height: moderateScaleVertical(25), width: moderateScale(25) }}
                        />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={{ color: '#fff', fontSize: 18 }}>{props.name}</Text>

                </View>
                <View>

                </View>
            </View>
        </SafeAreaView>
    )
}

export default Header