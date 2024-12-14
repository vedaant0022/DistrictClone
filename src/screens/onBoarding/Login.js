import { 
    View, 
    Text, 
    SafeAreaView, 
    Image, 
    TouchableWithoutFeedback, 
    Animated, // Import Animated
    Easing
} from 'react-native';
import React, { useRef } from 'react';
import { moderateScale, moderateScaleVertical } from '../../styles/responsive/responsiveSize';
import Phone from '../../components/Onboarding/Inputs/Phone';

const Login = () => {
    const scrollY = useRef(new Animated.Value(0)).current;


    const logoScale = scrollY.interpolate({
        inputRange: [0, 80],
        outputRange: [1, 0.9], 
        extrapolate: 'clamp',
    });

    const logoTranslateY = scrollY.interpolate({
        inputRange: [0, 120],
        outputRange: [0, -80], 
        extrapolate: 'clamp',
    });
    const logoTranslateY2 = scrollY.interpolate({
        inputRange: [0, 120],
        outputRange: [0, -150], 
        extrapolate: 'clamp',
    });

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#131315' }}>
            <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                bounces={true}
                alwaysBounceVertical={false}
                contentContainerStyle={{ paddingBottom: moderateScaleVertical(20) }}
                scrollEventThrottle={25} 
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true } 
                )}
            >
                <View style={{ marginHorizontal: moderateScale(15), marginTop: moderateScaleVertical(20),paddingTop:moderateScaleVertical(5) }}>
                    <TouchableWithoutFeedback>
                        <View style={{
                            borderWidth: 1,
                            borderColor: '#808193',
                            width: moderateScale(62),
                            height: moderateScaleVertical(35),
                            borderRadius: 15,
                            alignItems: 'center',
                            justifyContent: 'center',
                            alignSelf: 'flex-end',
                        }}>
                            <Text style={{ color: '#fff' }}>Skip</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                
                {/* Logo Section */}
                <Animated.View style={{
                    alignSelf: 'center',
                    marginTop: moderateScaleVertical(135),
                    transform: [{ scale: logoScale }, { translateY: logoTranslateY }],
                }}>
                    <Image
                        source={require('../../assets/Splash/Splashfinal.png')}
                        style={{ height: moderateScaleVertical(200), width: moderateScale(200) }}
                        resizeMode='contain'
                    />
                </Animated.View>

                {/* Text Section */}
                <Animated.View style={{
                    alignSelf: 'center',
                    marginTop: moderateScaleVertical(40),
                    transform: [{ scale: logoScale }, { translateY: logoTranslateY }],
                }}>
                <View>
                    <Text style={{ color: '#fff', textAlign: 'center', letterSpacing: 2 }}>Experience the best in </Text>
                    <Text style={{ color: '#fff', textAlign: 'center', letterSpacing: 2 }}>Dinning, Movies, and Events</Text>
                </View>
                </Animated.View>

                {/* Login Section */}
                <Animated.View style={{
                    alignSelf: 'center',
                    transform: [{ scale: logoScale }, { translateY: logoTranslateY2 }],
                }}>
                <View style={{ marginTop: moderateScaleVertical(90) }}>
                    <Text style={{ color: '#fff', fontSize: 18, fontWeight: '400', textAlign: 'center' }}>Log in or sign up</Text>
                </View>
                </Animated.View>

                {/* Input */}
                <View style={{ marginTop: moderateScaleVertical(20) }}>
                    <Phone />
                </View>

                {/* Terms & Policy */}
                <View style={{ marginTop: moderateScaleVertical(15) }}>
                    <Text style={{ color: '#fff', fontWeight: '300', textAlign: 'center', letterSpacing: 1 }}>By continuing, you agree to our</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    gap: 15,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: moderateScaleVertical(10),
                }}>
                    <Text style={{
                        color: '#fff',
                        fontWeight: '200',
                        letterSpacing: 1,
                        textDecorationLine: 'underline',
                    }}>Terms of Service</Text>
                    <Text style={{
                        color: '#fff',
                        fontWeight: '200',
                        letterSpacing: 1,
                        textDecorationLine: 'underline',
                    }}>Privacy Policy</Text>
                </View>
            </Animated.ScrollView>
        </SafeAreaView>
    );
};

export default Login;



