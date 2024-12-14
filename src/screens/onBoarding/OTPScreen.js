import { View, Text, SafeAreaView, TouchableOpacity, TextInput, ScrollView, Animated, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import { moderateScale, moderateScaleVertical } from '../../styles/responsive/responsiveSize';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import { errorMessage } from '../../utils';

const OTPScreen = () => {
  const navigation = useNavigation();
  const router = useRoute();
  const { number } = router.params;
  const [otp, setOtp] = useState(['', '', '', '']);
  const otpRefs = useRef([]);
  const translateY = useRef(new Animated.Value(0)).current; // For button animation

  // Handle OTP change and focus on next or previous input field
  const handleOtpChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < otpRefs.current.length - 1) {
      otpRefs.current[index + 1].focus();
    } else if (!text && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && index > 0 && !otp[index]) {
      otpRefs.current[index - 1].focus();
    }
  };


  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      Animated.spring(translateY, {
        toValue: -330, 
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

  const isOtpValid = otp.join('').length === 4;


  const button = () => {
    if (otp.join('') === '') {
      return (
        <View style={{
          backgroundColor: '#77787d', width: moderateScale(350), height: moderateScaleVertical(50), borderRadius: 12,
          alignItems: 'center', justifyContent: 'center',
        }}>
          <Text style={{ color: '#393a3e', fontSize: 18, fontWeight: '600', letterSpacing: 2 }}>Continue</Text>
        </View>
      );
    } else {
      return (
        <TouchableOpacity
        onPress={()=>{
          if(!isOtpValid){
            errorMessage("4-digit OTP required")
          }
          else {
            navigation.navigate("Home")
          }
          
        }}
          style={{
            backgroundColor: '#fff', width: moderateScale(350), height: moderateScaleVertical(50), borderRadius: 12,
            alignItems: 'center', justifyContent: 'center',
          }}
        >
          <Text style={{ color: '#393a3e', fontSize: 18, fontWeight: '600', letterSpacing: 2 }}>Continue</Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#131315' }}>
      <ScrollView bounces={true}>
        <View style={{ marginTop: moderateScaleVertical(12), marginLeft: moderateScale(20), marginRight: moderateScale(20) }}>
          <Header name="OTP Verification" />

          <View style={{ marginTop: moderateScaleVertical(40) }}>
            <Text style={{ color: '#fff', fontWeight: '400', fontSize: 18, letterSpacing: 2 }}>
              We have sent a verification code to +91 {number}
            </Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: moderateScaleVertical(50) }}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(el) => (otpRefs.current[index] = el)}
                style={{
                  width: 80,
                  height: 50,
                  borderWidth: 1,
                  borderColor: '#5f5e63',
                  textAlign: 'center',
                  fontSize: 24,
                  marginRight: moderateScale(15),
                  borderRadius: 9,
                  backgroundColor: '#0d0e12',
                  color: '#fff',
                }}
                keyboardType="numeric"
                maxLength={1}
                value={digit}
                onChangeText={(text) => handleOtpChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
              />
            ))}
          </View>

          <View style={{ marginTop: moderateScaleVertical(35) }}>
            <Text style={{ color: '#fff', fontWeight: '400', fontSize: 16, letterSpacing: 2 }}>
              Didn't get the OTP? <Text style={{ color: '#fff', fontWeight: '400', fontSize: 16, letterSpacing: 2, textDecorationLine: 'underline' }}>Resend</Text>
            </Text>
          </View>
          <Animated.View style={{
            marginTop: moderateScaleVertical(35),
            transform: [{ translateY }],
          }}>
            <View style={{ alignItems: 'center', alignSelf: 'center' ,marginTop:moderateScaleVertical(370)}}>
              {button()}
            </View>

            <View style={{marginTop:moderateScaleVertical(10)}}>
              <TouchableOpacity
              onPress={()=>{navigation.navigate("Login")}}
              >
              <Text style={{color:'#fff',textAlign:'center',letterSpacing:2,textDecorationLine:'underline'}}>Back to Login</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OTPScreen;
