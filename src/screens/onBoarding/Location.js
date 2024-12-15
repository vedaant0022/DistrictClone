import { View, Text, SafeAreaView, TouchableOpacity, PermissionsAndroid, Alert } from 'react-native'
import React from 'react'
import { moderateScale, moderateScaleVertical } from '../../styles/responsive/responsiveSize'
import Geolocation from 'react-native-geolocation-service';
import { errorMessage, successMessage } from '../../utils';
import { useNavigation } from '@react-navigation/native';

const Location = () => {
    const navigation = useNavigation();
    const requestLocationPermission = async () => {
        try {
          if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
              {
                title: 'Location Permission',
                message: 'This app needs access to your location to show nearby content.',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
              }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              getCurrentLocation();
            } else {
              errorMessage('Permission Denied', 'You need to enable location permission to proceed.');
            }
          } else {
            // iOS permission handling
            Geolocation.requestAuthorization('whenInUse').then((result) => {
              if (result === 'granted') {
                getCurrentLocation();
              } else {
                errorMessage('Permission Denied', 'You need to enable location permission to proceed.');
              }
            });
          }
        } catch (err) {
          console.warn(err);
        }
      };
    
      const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            successMessage( `Latitude: ${latitude}, Longitude: ${longitude}`);
            navigation.navigate('Home',{latitude: latitude, longitude: longitude})
          },
          (error) => {
            Alert.alert('Error', `Location error: ${error.message}`);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      };
    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#131315' }}>
            <View style={{ flex: 1 }}>
                <View style={{ marginLeft: moderateScale(20), marginRight: moderateScale(20), marginTop: moderateScaleVertical(12) ,justifyContent:'center',alignItems:'center',flex:1}}>
                    <View style={{marginTop:moderateScaleVertical(450)}}>
                    <View>
                        <Text style={{ fontSize: 20, color: '#fff', textAlign: 'center', letterSpacing: 2, fontWeight: '500' }}>Your city, your scene.</Text>
                        <Text style={{ fontSize: 20, color: '#fff', textAlign: 'center', letterSpacing: 2, fontWeight: '500' }}>Let's find your fit!</Text>
                    </View>
                    <View style={{ marginTop: moderateScaleVertical(20) }}>
                        <Text style={{ fontSize: 18, textAlign: 'center', color: '#9a9694', letterSpacing: 1 }}>Discover movies, events, and restaurants</Text>
                    </View>

                    <TouchableOpacity 
                    onPress={requestLocationPermission}
                    style={{ backgroundColor: '#fff', width: moderateScale(350), height: moderateScaleVertical(50), borderRadius: 12, alignItems: 'center', justifyContent: 'center',marginTop:moderateScaleVertical(35) }}>
                        <Text style={{ color: '#323233', fontSize: 18, fontWeight: '900', letterSpacing: 1 }}>Use current location</Text>
                    </TouchableOpacity>

                    <View style={{marginTop:moderateScaleVertical(25)}}>
                        <Text style={{color:'#fff',fontWeight:'400',letterSpacing:2,textDecorationLine:'underline',textDecorationStyle:'dashed',textAlign:'center',fontSize:16}}>Select location manually</Text>
                    </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Location