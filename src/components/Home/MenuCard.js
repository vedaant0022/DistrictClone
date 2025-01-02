import { View, Text, SafeAreaView, Modal, TouchableWithoutFeedback, Keyboard, Image, Switch, TouchableOpacity, ScrollView, Animated, } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { moderateScale, moderateScaleVertical } from '../../styles/responsive/responsiveSize';
import WhatsappModal from '../../components/Home/WhatsappModal';
import Header from '../../components/Home/Header';
import Search from '../../components/Home/Search';
import MenuCard from '../../components/Home/MenuCard';
import ForYou from '../../components/Home/ForYou';
import Movie from '../../components/Home/Movie';
import Events from '../../components/Home/Events';
import Dinning from '../../components/Home/Dinning';
import { tabData } from '../../constants/TabData';

const Home = () => {

  const [activeIndex, setActiveIndex] = useState(0);
  const bgColor = useRef(new Animated.Value(0)).current;
  const contentComponents = [<ForYou />, <Movie />, <Events />, <Dinning />];
  const animateBackgroundColor = (index) => {
    bgColor.setValue(0);
    Animated.timing(bgColor, {
      toValue: 1,
      duration: 400,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    animateBackgroundColor(activeIndex);
  }, [activeIndex]);

  const interpolatedColor = bgColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', tabData[activeIndex]?.activeColor || 'transparent'],
  });

  const renderModal = () => {
    return (
      <WhatsappModal />
    );
  };

  const header = () => {
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
            <TouchableWithoutFeedback>
              <Image
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/12225/12225935.png' }}
                style={{ width: moderateScale(30), height: moderateScale(30) }}
              />
            </TouchableWithoutFeedback>
          </View>
        </View>

      </View>
    );
  };

  const search = () => {
    return(<Search />)
  }

  const cards = () => {
    return (
      <View style={{alignSelf:'center',}}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: moderateScale(4) }}>
          {tabData.map((tab, index) => (
            <Animated.View
              key={index}
              style={{
                width: '25%',
                height: moderateScaleVertical(80),
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 15,
                backgroundColor: activeIndex === index ? interpolatedColor : 'transparent',
              }}
            >
              <TouchableWithoutFeedback onPress={() => setActiveIndex(index)}>
                <View style={{ alignItems: 'center' }}>
                  <Image
                    source={{ uri: tab.icon }}
                    style={{
                      height: moderateScaleVertical(30),
                      width: moderateScale(30),
                      tintColor: activeIndex === index ? '#fff' : tab.imageInactiveColor,
                    }}
                  />
                  <Text
                    style={{
                      color: activeIndex === index ? '#fff' : '#919095',
                      fontSize: 15,
                      marginTop: moderateScaleVertical(10),
                      textAlign: 'center',
                    }}
                  >
                    {tab.label}
                  </Text>
                </View>
              </TouchableWithoutFeedback>

            </Animated.View>
          ))}
        </View>
        <View style={{ marginTop: moderateScaleVertical(20) }}>
          {contentComponents[activeIndex]}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#131315' }}>
      <ScrollView>
        <View style={{ marginLeft: moderateScale(15), marginRight: moderateScale(15), marginTop: moderateScaleVertical(25) }}>
          {header()}
          {search()}
          <View style={{ marginTop: moderateScaleVertical(25) }}>
            {cards()}
          </View>
        </View>

        {renderModal()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;