import { View, Text, Image } from 'react-native'
import React from 'react'
import { moderateScale, moderateScaleVertical } from '../../styles/responsive/responsiveSize'
import Search from './Search'


const Header = () => {
    return (
        <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: moderateScale(15) }}>
                    <View>
                        <Image
                            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3177/3177361.png' }}
                            style={{ width: moderateScale(25), height: moderateScaleVertical(25), tintColor: '#ababab' }}
                        />
                    </View>
                    <View style={{ width: '80%' }}>
                        <Text style={{ color: '#ffffff', fontWeight: '500', fontSize: 16 }}>Chintamani Vihar</Text>
                        <Text style={{ color: '#b0b0b0', fontWeight: '400' }}>Tirupati Nagar Phase 2, Tirupati Nagar</Text>
                    </View>
                </View>
                <View>
                    <Image
                        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/12225/12225935.png' }}
                        style={{ width: moderateScale(25), height: moderateScale(25) }}
                    />
                </View>
            </View>
            <Search/>
        </View>
    )
}

export default Header