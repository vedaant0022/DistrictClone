import {
  View,
  Text,
  SafeAreaView,
  Image,
  Animated,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { moderateScale, moderateScaleVertical } from '../../styles/responsive/responsiveSize';
import WhatsappModal from '../../components/Home/WhatsappModal';
import Search from '../../components/Home/Search';
import ForYou from '../../components/Home/ForYou';
import Movie from '../../components/Home/Movie';
import Events from '../../components/Home/Events';
import Dinning from '../../components/Home/Dinning';
import { tabData } from '../../constants/TabData';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation()
  const [activeIndex, setActiveIndex] = useState(0);
  const bgColor = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;

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

  const tabHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [80, 40],
    extrapolate: 'clamp',
  });

  const tabImageOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const tabTextFontSize = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [15, 14],
    extrapolate: 'clamp',
  });

  const tabTextTranslateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -15],
    extrapolate: 'clamp',
  });

  const tabImageScale = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0], 
    extrapolate: 'clamp',
  });

  const renderHeader = () => (
    <View style={{ marginTop: moderateScaleVertical(22) }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: moderateScale(15) }}>
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3177/3177361.png' }}
            style={{ width: moderateScale(25), height: moderateScaleVertical(25), tintColor: '#ababab' }}
          />
          <View style={{ width: '80%' }}>
            <Text style={{ color: '#ffffff', fontWeight: '500', fontSize: 16 }}>Chintamani Vihar</Text>
            <Text style={{ color: '#b0b0b0', fontWeight: '400' }}>Tirupati Nagar Phase 2, Tirupati Nagar</Text>
          </View>
        </View>
        <TouchableWithoutFeedback
        onPress={()=>{navigation.navigate('Profile')}}
        >
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/12225/12225935.png' }}
            style={{ width: moderateScale(30), height: moderateScale(30) }}
          />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );

  const renderStickySection = () => (
    <View style={{ backgroundColor: '#131315', paddingBottom: moderateScaleVertical(12) }}>
      <View>
        <Search />
      </View>
      <View style={{ marginTop: moderateScaleVertical(18) }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          {tabData.map((tab, index) => (
            <Animated.View
              key={index}
              style={{
                width: '25%',
                height: tabHeight,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 15,
                backgroundColor: activeIndex === index ? interpolatedColor : 'transparent',
              }}
            >
              <TouchableWithoutFeedback onPress={() => setActiveIndex(index)}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Animated.Image
                    source={{ uri: tab.icon }}
                    style={{
                      height: moderateScaleVertical(30),
                      width: moderateScale(30),
                      tintColor: activeIndex === index ? '#fff' : tab.imageInactiveColor,
                      opacity: tabImageOpacity,
                      transform: [{ scale: tabImageScale }], // Apply the scale animation here
                    }}
                  />
                  <Animated.Text
                    style={{
                      color: activeIndex === index ? '#fff' : '#919095',
                      fontSize: tabTextFontSize,
                      transform: [{ translateY: tabTextTranslateY }],
                      textAlign: 'center',
                    }}
                  >
                    {tab.label}
                  </Animated.Text>
                </View>
              </TouchableWithoutFeedback>
            </Animated.View>
          ))}
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#131315' }}>
      <View style={{ flex: 1, marginLeft: 10, marginRight: 10 }}>
        <Animated.ScrollView
        showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[1]}
          contentContainerStyle={{ paddingBottom: moderateScaleVertical(20) }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
        >
          {renderHeader()}
          {renderStickySection()}
          <View style={{ marginHorizontal: moderateScale(15), marginTop: moderateScaleVertical(20) }}>
            {contentComponents[activeIndex]}
          </View>
        </Animated.ScrollView>
        <WhatsappModal />
      </View>
    </SafeAreaView>
  );
};

export default Home;
