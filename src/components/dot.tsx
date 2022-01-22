import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

interface DotProps {
  index: number;
  activeDotIndex: Animated.SharedValue<number>;
}

const Dot: React.FC<DotProps> = ({ activeDotIndex, index }) => {
  const rDotStyle = useAnimatedStyle(() => {
    const isActive = activeDotIndex.value === index;
    return {
      backgroundColor: isActive ? 'black' : 'white',
    };
  });

  return <Animated.View style={[styles.dot, rDotStyle]} />;
};

const styles = StyleSheet.create({
  dot: {
    width: 10,
    height: 10,
    marginHorizontal: 5,
    borderRadius: 10,
    borderWidth: 1,
  },
});

export default Dot;
