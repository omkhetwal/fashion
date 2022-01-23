import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { Box } from '../theme';
import { palette } from '../theme/colors';

const { width, height } = Dimensions.get('window');

const SLIDE_HEIGHT = 0.81 * height;

interface BoardingCardProps {
  board: {
    title: string;
    subtitle: string;
    description: string;
    url: string;
  };
  translateX: Animated.SharedValue<number>;
  index: number;
  activeIndex: number;
}

const BOARDING_BACKGROUND_COLOR = {
  0: 'amber300',
  1: 'blu300',
  2: 'pink300',
  3: 'fuchsia300',
};

const BoardingCard = ({
  board,
  translateX,
  index,
  activeIndex,
}: BoardingCardProps) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  const cardStyles = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolate.CLAMP
    );

    return {
      transform: [
        {
          scale: scale,
        },
      ],
      opacity: scale,
    };
  });

  return (
    <Box
      backgroundColor={'sky400'}
      width={width}
      alignItems={'center'}
      justifyContent={'flex-start'}
    >
      <Box
        width={width}
        height={height * 0.81}
        // @ts-ignore
        backgroundColor={BOARDING_BACKGROUND_COLOR[index]}
        paddingTop={'l'}
        borderBottomEndRadius={'xl'}
        alignItems={'center'}
        justifyContent={'flex-start'}
      >
        <Animated.Image
          source={{
            uri: board.url,
          }}
          style={[styles.logo, cardStyles]}
          resizeMode={'cover'}
        />

        <View style={styles.headerContainer}>
          <Animated.Text style={[styles.header]}>{board.title}</Animated.Text>
        </View>
      </Box>
    </Box>
  );
};

export default BoardingCard;

const styles = StyleSheet.create({
  headerContainer: {
    transform: [{ translateX: 0 }, { rotate: '-90deg' }],
    justifyContent: 'center',
    height: 100,
    position: 'absolute',
    left: -20,
    bottom: 100,
  },
  header: {
    fontSize: 60,
    textAlign: 'center',
    color: palette.white,
  },
  logo: {
    width: 320,
    height: 404,
    borderRadius: 10,
  },
});
