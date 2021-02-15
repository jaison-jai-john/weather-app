import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { colors } from '../utilities/index';

const { PRIMARY_COLOR, SECONDARY_COLOR, BORDER_COLOR } = colors;

export default function WeatherDetails({ currentWeather, unitsSystem }) {
  const {
    main: { feels_like, humidity, pressure },
    wind: { speed },
  } = currentWeather;

  const windSpeed =
    unitsSystem === 'metric'
      ? `${Math.round(speed)} m/s`
      : `${Math.round(speed)} miles/h`;
  const atmosphericPressure =
    unitsSystem === 'metric'
      ? `${pressure} hPa`
      : `${Math.round(pressure * 0.014503773773)} psi`;
  const tempFeel =
    unitsSystem === 'metric' ? `${feels_like}°` : `${feels_like}F°`;
  return (
    <View style={styles.weatherDetails}>
      <View style={styles.weatherDetailsRow}>
        <View
          style={
            isMobile
              ? {
                  ...styles.weatherDetailsBox,
                  borderRightWidth: 1,
                  borderRightColor: BORDER_COLOR,
                }
              : {
                  ...styles.weatherDetailsBoxL,
                  borderRightWidth: 2,
                  borderRightColor: BORDER_COLOR,
                }
          }>
          <View style={styles.weatherDetailsRow}>
            <FontAwesome5
              name='temperature-low'
              size={isMobile ? 25 : 50}
              color={PRIMARY_COLOR}
            />
            <View style={styles.weatherDetailsItems}>
              <Text style={isMobile ? { fontSize: 14 } : styles.text}>
                Feels like :
              </Text>
              <Text
                style={isMobile ? styles.textSecondary : styles.textSecondaryL}>
                {tempFeel}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={
            isMobile ? styles.weatherDetailsBox : styles.weatherDetailsBoxL
          }>
          <View style={styles.weatherDetailsRow}>
            <MaterialCommunityIcons
              name='water'
              size={isMobile ? 30 : 60}
              color={PRIMARY_COLOR}
            />
            <View style={styles.weatherDetailsItems}>
              <Text style={isMobile ? { fontSize: 14 } : styles.text}>
                Humidity :
              </Text>
              <Text
                style={isMobile ? styles.textSecondary : styles.textSecondaryL}>
                {humidity}%
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          ...styles.weatherDetailsRow,
          borderTopWidth: 1,
          borderTopColor: BORDER_COLOR,
        }}>
        <View
          style={
            isMobile
              ? {
                  ...styles.weatherDetailsBox,
                  borderRightWidth: 1,
                  borderRightColor: BORDER_COLOR,
                }
              : {
                  ...styles.weatherDetailsBoxL,
                  borderRightWidth: 2,
                  borderRightColor: BORDER_COLOR,
                }
          }>
          <View style={styles.weatherDetailsRow}>
            <MaterialCommunityIcons
              name='weather-windy'
              size={isMobile ? 30 : 60}
              color={PRIMARY_COLOR}
            />
            <View style={styles.weatherDetailsItems}>
              <Text style={isMobile ? { fontSize: 14 } : styles.text}>
                Wind Speed :
              </Text>
              <Text
                style={isMobile ? styles.textSecondary : styles.textSecondaryL}>
                {windSpeed}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={
            isMobile ? styles.weatherDetailsBox : styles.weatherDetailsBoxL
          }>
          <View style={styles.weatherDetailsRow}>
            <MaterialCommunityIcons
              name='speedometer'
              size={isMobile ? 30 : 60}
              color={PRIMARY_COLOR}
            />
            <View style={styles.weatherDetailsItems}>
              <Text style={isMobile ? { fontSize: 14 } : styles.text}>
                Pressure :
              </Text>
              <Text
                style={isMobile ? styles.textSecondary : styles.textSecondaryL}>
                {atmosphericPressure}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
const width = Dimensions.get('window').height;
const styles = StyleSheet.create({
  weatherDetails: {
    flexDirection: 'column',
    marginTop: 'auto',
    margin: 10,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderRadius: 10,
  },
  weatherDetailsL: {
    marginTop: 'auto',
    margin: 20,
    borderWidth: 2,
    borderColor: BORDER_COLOR,
    borderRadius: 10,
  },
  weatherDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  weatherDetailsBox: {
    width: (width * 50) / 100,
    maxWidth: (width * 50) / 100,
    flex: 1,
    padding: 20,
  },
  weatherDetailsBoxL: {
    maxWidth: (width * 50) / 100,
    maxWidth: (width * 50) / 100,
    flex: 1,
    padding: 45,
  },
  weatherDetailsItems: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  textSecondary: {
    fontSize: 15,
    color: SECONDARY_COLOR,
    fontWeight: '700',
    margin: 0,
  },
  textSecondaryL: {
    fontSize: 30,
    color: SECONDARY_COLOR,
    fontWeight: '700',
  },
  text: {
    fontSize: 20,
  },
});
