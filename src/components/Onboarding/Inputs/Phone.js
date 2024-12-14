import { View, Text, TouchableOpacity, TextInput, Animated, KeyboardAvoidingView, Platform, Keyboard, Modal, FlatList, Image, TouchableWithoutFeedback, TouchableWithoutFeedbackBase } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { moderateScale, moderateScaleVertical } from '../../../styles/responsive/responsiveSize';
import { useNavigation } from '@react-navigation/native';
import { successMessage } from '../../../utils';
import { countryCodes } from '../../../constants/PinCode/Pincode';

const Phone = (props) => {
    const navigation = useNavigation();
    const [number, setnumber] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCountryCode, setSelectedCountryCode] = useState('+91');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCountryCodes, setFilteredCountryCodes] = useState(countryCodes);

    const translateY = useRef(new Animated.Value(0)).current;
    const modalAnimation = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            Animated.spring(translateY, {
                toValue: 0,
                useNativeDriver: true,
                speed: 1,
                bounciness: 10,
            }).start();
        });

        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            Animated.spring(translateY, {
                toValue: 0,
                useNativeDriver: true,
                speed: 1,
                bounciness: 10,
            }).start();
        });

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    const openModal = () => {
        setModalVisible(true);
        Animated.timing(modalAnimation, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
            friction: 5,
            tension: 100,
        }).start();
    };

    const closeModal = () => {
        Animated.timing(modalAnimation, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
            friction: 7,
            tension: 50,
        }).start(() => setModalVisible(false));
    };

    const button = () => {
        if (number === "" || number.length < 10) {
            return (
                <View style={{ backgroundColor: '#77787d', width: moderateScale(350), height: moderateScaleVertical(50), borderRadius: 12, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: '#393a3e', fontSize: 18, fontWeight: '600', letterSpacing: 2 }}> Continue</Text>
                </View>
            )
        }
        return (
            <TouchableOpacity
                onPress={() => {
                    successMessage(`OTP sent successfully on ${number}`);
                    navigation.navigate('OTP', { number: number });
                    setnumber("");
                }}
                style={{ backgroundColor: '#fff', width: moderateScale(350), height: moderateScaleVertical(50), borderRadius: 12, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: '#393a3e', fontSize: 18, fontWeight: '600', letterSpacing: 2 }}> Continue</Text>
            </TouchableOpacity>
        );
    };

    const handleCountrySelect = (code) => {
        setSelectedCountryCode(code);
        closeModal();
        setSearchTerm("");
    };

    const handleSearchChange = (text) => {
        setSearchTerm(text);
        const filtered = countryCodes.filter((item) =>
            item.country.toLowerCase().includes(text.toLowerCase()) ||
            item.code.includes(text)
        );
        setFilteredCountryCodes(filtered);
    };

    const translateModal = modalAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 500], 
    });

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
          Animated.spring(translateY, {
            toValue: -130, 
            speed: 1,
            bounciness: 2,
            useNativeDriver: true,
          }).start();
        });
    
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
          Animated.spring(translateY, {
            toValue: 0, 
            speed: 1,
            bounciness: 2,
            useNativeDriver: true,
          }).start();
        });
    
        return () => {
          keyboardDidHideListener.remove();
          keyboardDidShowListener.remove();
        };
      }, []);

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, alignItems: 'center' }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row', gap: 15 }}>
                    <Animated.View style={{ transform: [{ translateY }], }}>
                        <TouchableOpacity
                            onPress={openModal}
                            style={{
                                borderWidth: 1,
                                borderColor: '#2f2d32',
                                padding: moderateScaleVertical(15),
                                borderRadius: 15,
                                width: moderateScale(95),
                                backgroundColor: '#0d0e12',
                                height: moderateScaleVertical(55),
                                alignItems:'center'
                            }}
                        >
                            <Text style={{ color: '#fff',textAlign:'center' }}>{selectedCountryCode}</Text>
                        </TouchableOpacity>
                    </Animated.View>

                    <Animated.View style={{ transform: [{ translateY }], }}>
                        <View style={{ borderWidth: 1, borderColor: '#2f2d32', borderRadius: 15, width: moderateScale(250), backgroundColor: '#0d0e12', height: moderateScaleVertical(55) }}>
                            <TextInput
                                placeholder='10-digit mobile number'
                                placeholderTextColor='#525357'
                                style={{ color: '#fff', fontSize: 16, top: 5, left: 5, fontWeight: '500' }}
                                keyboardType='decimal-pad'
                                value={number}
                                onChangeText={setnumber}
                                maxLength={10}
                            />
                        </View>
                    </Animated.View>
                </View>

                <Animated.View style={{ marginTop: moderateScaleVertical(30), 
                    transform: [{ translateY }],
                     }}>
                    {button()}
                </Animated.View>
            </View>

            <Modal
                transparent={true}
                visible={modalVisible}
                animationType="none"
                onRequestClose={closeModal}
            >
                <TouchableWithoutFeedback
                onPress={closeModal}
                >
                <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <TouchableWithoutFeedback onPress={closeModal}>
                        <Animated.View
                            style={{
                                transform: [{ translateY: translateModal }],
                                backgroundColor: '#1c1c1e',
                                width: '100%',
                                padding: 20,
                                position: 'absolute',
                                bottom: 0,
                                borderTopLeftRadius: 15,
                                borderTopRightRadius: 15,
                                height: '80%'
                            }}
                        >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', gap: 70 }}>
                                <TouchableOpacity onPress={closeModal}>
                                    <Image
                                        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2732/2732652.png' }}
                                        style={{ height: 25, width: 25, tintColor: '#fff' }}
                                    />
                                </TouchableOpacity>
                                <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 15, color: '#fff' }}>
                                    Select Country Code
                                </Text>
                                <View></View>
                            </View>

                            <View style={{ borderWidth: 1, width: '100%', height: moderateScaleVertical(45), borderRadius: 15, borderColor: '#3d3d3f', backgroundColor: '#2e2e30', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: 8, paddingLeft: 15 }}>
                                <Image
                                    source={{ uri: 'https://cdn-icons-png.flaticon.com/512/54/54481.png' }}
                                    style={{ height: 25, width: 25, tintColor: '#7b7a7f' }}
                                />
                                <TextInput
                                    placeholder='Select Country code'
                                    placeholderTextColor='#7b7a7f'
                                    style={{ fontSize: 17, color: '#fff', flex: 1 }}
                                    value={searchTerm}
                                    onChangeText={handleSearchChange}
                                />
                            </View>

                            <FlatList
                                bounces={true}
                                decelerationRate={50}
                                showsVerticalScrollIndicator={false}
                                data={filteredCountryCodes}
                                style={{ width: '100%' }}
                                renderItem={({ item, index }) => (
                                    <TouchableOpacity
                                        onPress={() => handleCountrySelect(item.code)}
                                        style={{
                                            paddingVertical: 10,
                                            flex: 1,
                                            width: '100%',
                                            alignItems: 'center',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between'
                                        }}
                                    >
                                        <Text style={{ fontSize: 18, color: '#ffffff' }}>
                                            {item.country}
                                        </Text>
                                        <Text style={{ fontSize: 18, color: '#ffffff' }}>({item.code})</Text>
                                    </TouchableOpacity>
                                )}
                                keyExtractor={(item, index) => `${item.code}-${index}`}
                            />
                        </Animated.View>
                    </TouchableWithoutFeedback>
                </View>
                </TouchableWithoutFeedback>
            </Modal>
        </KeyboardAvoidingView>
    );
};

export default Phone;

