import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { colors } from '../utilities/index';

const { PRIMARY_COLOR, SECONDARY_COLOR, BORDER_COLOR } = colors;

export default function Weatherinfo({ currentWeather, suffix }) {
  const {
    main: { temp, temp_min, temp_max },
    weather: [details],
    name,
  } = currentWeather;
  const { icon, description, main } = details;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;
  const fallBackIconUrl =
    '../resource/images/Ekran-Resmi-2019-11-18-18.08.13.png';
  return (
    <View style={styles.weatherinfo}>
      <Text
        style={
          isMobile ? { fontSize: 14 } : { fontSize: 30, paddingBottom: 10 }
        }>
        {name}
      </Text>
      <Image
        source={{ uri: iconUrl }}
        style={isMobile ? styles.weatherIcon : styles.weatherIconL}
      />
      <View style={styles.tempRow}>
        <View
          style={isMobile ? styles.weatherInfoItems : styles.weatherInfoItemsL}>
          <Text style={isMobile ? { fontSize: 14 } : { fontSize: 30 }}>
            Min Temp
          </Text>
          <Text style={isMobile ? styles.textSecondary : styles.textSecondaryL}>
            {temp_min}
            {suffix}
          </Text>
        </View>
        <View
          style={[
            styles.Primarytemp,
            isMobile ? styles.Primarytemp : styles.PrimarytempL,
          ]}>
          <Text
            style={
              isMobile
                ? { fontSize: 15, color: SECONDARY_COLOR }
                : { fontSize: 30, color: SECONDARY_COLOR }
            }>
            Current Temp
          </Text>
          <Text style={isMobile ? styles.textPrimary : styles.textPrimaryL}>
            {temp}
            {suffix}
          </Text>
        </View>
        <View
          style={isMobile ? styles.weatherInfoItems : styles.weatherInfoItemsL}>
          <Text style={isMobile ? { fontSize: 14 } : { fontSize: 30 }}>
            Max Temp
          </Text>
          <Text style={isMobile ? styles.textSecondary : styles.textSecondaryL}>
            {temp_max}
            {suffix}
          </Text>
        </View>
      </View>
      <Text
        style={
          isMobile ? styles.weatherDescription : styles.weatherDescriptionL
        }>
        {description}
      </Text>
      <Text style={isMobile ? styles.textSecondary : styles.textSecondaryL}>
        {main}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  weatherinfo: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  weatherIcon: {
    minHeight: 90,
    minWidth: 90,
    width: 100,
    height: 50,
  },
  weatherIconL: {
    minHeight: 90,
    minWidth: 90,
    width: 400,
    height: 250,
  },
  weatherDescription: {
    textTransform: 'capitalize',
  },
  weatherDescriptionL: {
    fontSize: 24,
    textTransform: 'capitalize',
  },
  textPrimary: {
    fontSize: 40,
    color: PRIMARY_COLOR,
  },
  textPrimaryL: {
    fontSize: 80,
    padding: 10,
    color: PRIMARY_COLOR,
  },
  Primarytemp: {
    borderColor: BORDER_COLOR,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    padding: 20,
  },
  PrimarytempL: {
    borderColor: BORDER_COLOR,
    borderRightWidth: 2,
    borderLeftWidth: 2,
    padding: 20,
    alignItems: 'center',
  },
  textSecondary: {
    fontSize: 20,
    color: SECONDARY_COLOR,
    fontWeight: '500',
    marginTop: 10,
  },
  textSecondaryL: {
    fontSize: 40,
    color: SECONDARY_COLOR,
    fontWeight: '500',
    marginTop: 10,
  },
  tempRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  weatherInfoItems: {
    padding: 10,
    alignItems: 'center',
  },
  weatherInfoItemsL: {
    padding: 20,
    alignItems: 'center',
  },
});
