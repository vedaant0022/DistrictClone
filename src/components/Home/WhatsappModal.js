import { View, Text, Switch, TouchableOpacity, TouchableWithoutFeedback, Image, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import { moderateScale, moderateScaleVertical } from '../../styles/responsive/responsiveSize';

const WhatsappModal = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [opt, setopt] = useState(false);

    const closeModal = () => {
        setModalVisible(false);
      };
  
    const toggleSwitch = () => setopt(previousState => !previousState);
    useEffect(() => {
        setModalVisible(true);
      }, []);
    return (
        <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={()=>setModalVisible(false)}>
          <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.6)', justifyContent: 'flex-end', }}>
            <View style={{ backgroundColor: '#131315', borderTopLeftRadius: 16, borderTopRightRadius: 16, height: '53%' }}>

              <View style={{ alignItems: 'center' }}>
                <View style={{ marginTop: moderateScaleVertical(-45) }}>
                  <Image
                    source={require('../../assets/Logo/Bell.png')}
                    style={{ height: moderateScaleVertical(250), width: moderateScale(250) }}
                    resizeMode='contain'
                  />
                </View>
                <View style={{ marginTop: moderateScaleVertical(-40) }}>
                  <Text style={{ textAlign: 'center', color: '#eeeff1', fontSize: 18 }}>Don't miss out on fun!</Text>
                  <Text style={{ textAlign: 'center', color: '#727176', fontSize: 16, paddingTop: moderateScaleVertical(15) }}>Turn on notification to get updates on your movie </Text>
                  <Text style={{ textAlign: 'center', color: '#727176', fontSize: 16 }}>bookings, event reminders, and dining deals</Text>
                </View>

                <View style={{ borderWidth: 0.8, width: '90%', borderColor: '#2b2a2c', marginTop: moderateScaleVertical(20) }}></View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-around', gap: 25, marginTop: moderateScaleVertical(10) }}>
                  <Text style={{ color: '#cccdce', fontSize: 17, letterSpacing: 1, fontWeight: '600' }}>Opt in for WhatsApp notifications</Text>
                  <Switch
                    trackColor={{ false: '#feffff', true: '#feffff' }}
                    thumbColor={opt ? '#876eff' : '#876eff'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={opt}

                  />

                </View>
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={{
                    backgroundColor: '#fff', width: moderateScale(350), height: moderateScaleVertical(50), borderRadius: 12,
                    alignItems: 'center', justifyContent: 'center', marginTop: moderateScaleVertical(25)
                  }}
                >
                  <Text style={{ color: '#393a3e', fontSize: 18, fontWeight: '600', letterSpacing: 2 }}>Continue</Text>
                </TouchableOpacity>

                <Text style={{ color: '#fff', fontWeight: '500', fontSize: 14, textDecorationLine: 'underline', paddingTop: moderateScaleVertical(12) }}>Not right now</Text>
              </View>
              


            </View>
          </View>
        </TouchableWithoutFeedback>
        
      </Modal>
    )
}

export default WhatsappModal