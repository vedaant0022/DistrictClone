import { View, Text, SafeAreaView, Modal, TouchableWithoutFeedback, Keyboard, Image, Switch, TouchableOpacity, } from 'react-native';
import React, { useEffect, useState } from 'react';
import { moderateScale, moderateScaleVertical } from '../../styles/responsive/responsiveSize';
import WhatsappModal from '../../components/Home/WhatsappModal';

const Home = () => {

  const renderModal = () => {
    return (
      <WhatsappModal />
    );
  };



  return (
    <SafeAreaView style={{flex: 1,backgroundColor: '#131315',}}>
      <View style={{flex: 1,justifyContent: 'center',alignItems: 'center',}}>
        
      </View>
      {renderModal()}
    </SafeAreaView>
  );
};

export default Home;
