import { Picker } from '@react-native-community/picker';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

export default function UnitsPicker({ ...props }) {
  const { unitsSystem, setUnitsSystem } = props;
  return (
    <View
      style={[styles.unitsSystem, isMobile ? styles.mobile : styles.tablet]}>
      <Picker
        selectedValue={unitsSystem}
        onValueChange={(item) => setUnitsSystem(item)}
        mode='dropdown'
        itemStyle={isMobile ? { fontSize: 12 } : styles.item}>
        <Picker.Item label='C°' value='metric' />
        <Picker.Item label='F°' value='imperial' />
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  unitsSystem: {
    position: 'absolute',
    ...Platform.select({
      ios: {
        top: -20,
      },
      android: {
        top: 20,
      },
    }),
    left: 20,
  },
  mobile: {
    height: 50,
    width: 100,
  },
  tablet: {
    height: 100,
    width: 200,
  },
  item: {
    ...Platform.select({
      ios: {
        fontSize: 20,
      },
      android: {
        height: 50,
        transform: [{ scaleX: 1 }, { scaleY: 1 }],
      },
    }),
  },
});
