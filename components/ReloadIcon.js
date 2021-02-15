import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { useMediaQuery } from 'react-responsive';
import { colors } from '../utilities/index';

export default function ReloadIcon({ load }) {
  //* Portrait Tablets and Ipads
  const isTabletOrIpad = useMediaQuery({
    query: '(maxWidth: 1024px) and (minWidth: 768px)',
  });
  //* Check orientation
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });
  //* check if mobile and small tablet
  const isMobileOrLowResTablet = useMediaQuery({
    query: '(maxWidth: 767px) and (minWidth: 481px)',
  });
  //* check if standard mobiles
  const checkMobile = () => {
    if (isMobileOrLowResTablet) {
      return useMediaQuery({
        query: '(maxWidth: 480px) and (minWidth: 320px)',
      });
    }
  };
  const isMobile = checkMobile();

  const reloadIconName = Platform.os === 'ios' ? 'ios-refresh' : 'md-refresh';
  return (
    <View style={styles.reloadIcon}>
      <Ionicons
        onPress={load}
        name={reloadIconName}
        size={isMobile ? 24 : 50}
        color={colors.PRIMARY_COLOR}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  reloadIcon: {
    position: 'absolute',
    top: 30,
    right: 0,
  },
});
