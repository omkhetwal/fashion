import { Box, makeStyles, Text, Theme } from '@/theme';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');
export const SLIDE_HEIGHT = 0.64 * height;

interface SlideProps {
  title: string;
  right?: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  textWrapper: {
    height: 100,
    justifyContent: 'center',
  },
}));

const Slide = ({ title, right }: SlideProps) => {
  const styles = useStyles();

  const transform = [
    {
      translateX: right ? width / 2 - 80 : -width / 2 + 80,
    },
    {
      translateY: (SLIDE_HEIGHT - 100) / 2,
    },
    {
      rotate: right ? '90deg' : '-90deg',
    },
  ];

  return (
    <Box flex={1} width={width}>
      <Animated.View style={[styles.textWrapper, { transform }]}>
        <Text variant={'hero'}>{title}</Text>
      </Animated.View>
    </Box>
  );
};

export default Slide;
