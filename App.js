import { WEATHER_API_KEY } from '@env';
import '@expo/match-media';
import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Platform,
  SafeAreaView,
  // StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useMediaQuery } from 'react-responsive';
import ReloadIcon from './components/ReloadIcon';
import UnitsPicker from './components/UnitsPicker';
import WeatherDetails from './components/WeatherDetails';
import Weatherinfo from './components/weatherinfo';
import { colors } from './utilities/index';

const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?';

export default function App() {
  const [unitsSystem, setUnitsSystem] = useState('metric');
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [suffix, setSuffix] = useState('°');

  useEffect(() => {
    load();
  }, [unitsSystem]);
  async function load() {
    setCurrentWeather(null);
    setErrorMessage(null);
    try {
      let { status } = await Location.requestPermissionsAsync();

      if (status != 'granted') {
        setErrorMessage('Access to location is needed to run the app');
        return;
      }

      const location = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = location.coords;
      const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`;
      const response = await fetch(weatherUrl);
      const result = await response.json();

      if (response.ok) {
        setCurrentWeather(result);
      } else {
        setErrorMessage(result.message);
      }

      if (unitsSystem == 'metric') {
        setSuffix('°');
      } else {
        setSuffix(' F°');
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  //* Portrait Tablets and Ipads
  const checkTabletOrIpad = () => {
    if (
      useMediaQuery({ query: '(max-width: 1024px' }) == true &&
      useMediaQuery({ query: '(min-device-width)' }) == true
    ) {
      return true;
    } else {
      return false;
    }
  };
  global.isTabletOrIpad = useMediaQuery({
    query: '(maxWidth: 1024px) and (minWidth: 768px)',
  });
  //* Check orientation
  global.isPortrait = useMediaQuery({ query: '(orientation: portrait)' });
  //* check if mobile and small tablet
  global.isMobileOrLowResTablet = useMediaQuery({
    query: '(maxWidth: 767px) and (minWidth: 481px)',
  });
  //* check if standard mobiles
  // global.checkMobile = () => {
  //   if (isMobileOrLowResTablet) {
  //     if (
  //       useMediaQuery({
  //         query: '(maxWidth: 480px) and (minWidth: 320px)',
  //       }) === true
  //     ) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   }
  // };
  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;
  global.checkMobile = () => {
    if (width < 480 && width > 320) {
      return true;
    } else {
      return false;
    }
  };
  global.isMobile = checkMobile();
  if (currentWeather) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.main}>
          <UnitsPicker
            unitsSystem={unitsSystem}
            setUnitsSystem={setUnitsSystem}
          />
          <Weatherinfo currentWeather={currentWeather} suffix={suffix} />
          <ReloadIcon load={load} />
        </View>
        <WeatherDetails
          currentWeather={currentWeather}
          unitsSystem={unitsSystem}
        />
        <StatusBar style='auto' />
      </SafeAreaView>
    );
  } else if (errorMessage) {
    return (
      <SafeAreaView style={styles.container}>
        <ReloadIcon load={load} />
        <Image
          source={{
            uri: './resource/images/Ekran-Resmi-2019-11-18-18.08.13.png',
          }}
        />
        <Text style={{ textAlign: 'center' }}>{errorMessage}</Text>
        <StatusBar style='auto' />
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size='large' color={colors.PRIMARY_COLOR} />
        <StatusBar style='auto' />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Platform.Os === 'android' ? StatusBar.currentHeight : 0,
    // margin: 20,
  },
  main: {
    position: 'relative',
    justifyContent: 'center',
    flex: 1,
  },
});
