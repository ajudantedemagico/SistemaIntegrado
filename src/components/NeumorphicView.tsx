import React from 'react';
import { View, StyleSheet, Platform, StyleProp, ViewStyle } from 'react-native';

interface NeumorphicViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  borderRadius?: number;
}

const NeumorphicView: React.FC<NeumorphicViewProps> = ({ children, style, borderRadius = 20 }) => {
  return (
    <View style={[styles.outerShadow, { borderRadius }, style]}>
      <View style={[styles.innerLight, { borderRadius }]}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerShadow: {
    backgroundColor: '#E0E5EC',
    ...Platform.select({
      ios: {
        shadowColor: '#a3b1c6',
        shadowOffset: { width: 6, height: 6 },
        shadowOpacity: 0.6,
        shadowRadius: 10,
      },
      android: {
        elevation: 8,
        shadowColor: '#000',
      },
    }),
  },
  innerLight: {
    backgroundColor: '#E0E5EC',
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#ffffff',
        shadowOffset: { width: -6, height: -6 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
      },
    }),
  },
});

export default NeumorphicView;