import { View, Text, TextInput, Image, Animated, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { moderateScale, moderateScaleVertical } from '../../styles/responsive/responsiveSize'


const Search = () => {
    const [placeholder, setPlaceholder] = useState('Search for Pushpa');
    const placeholderTexts = [
        'Search for Pushpa',
        'Search for RRR',
        'Search for Kantara',
        'Search for KGF',
    ];

    const fadeAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        let index = 0;

        const interval = setInterval(() => {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start(() => {

                index = (index + 1) % placeholderTexts.length;
                setPlaceholder(placeholderTexts[index]);

                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }).start();
            });
        }, 2000);

        return () => clearInterval(interval);
    }, [fadeAnim]);
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}
            style={{ flex: 1 }}
        >
            <View style={{ width: '100%', borderWidth: 1, borderColor: '#2b2a2d', marginTop: moderateScaleVertical(20), borderRadius: 13, backgroundColor: '#262628', flexDirection: 'row', alignItems: 'center', height: moderateScaleVertical(50) }}>
                <Image
                    source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2811/2811790.png ' }}
                    style={{ height: moderateScaleVertical(25), width: moderateScaleVertical(25), tintColor: '#5d5c60', marginLeft: moderateScaleVertical(15) }}
                />
                <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
                    <TextInput
                        placeholder={placeholder}
                        placeholderTextColor="#5d5c60"
                        style={{ fontSize: 15, flex: 1, marginLeft: moderateScale(10), color: '#5d5c60' }}
                    />
                </Animated.View>
            </View>
        </KeyboardAvoidingView>
    )
}

export default Search